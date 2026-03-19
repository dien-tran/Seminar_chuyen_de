# 🚀 Labs: Advanced Coding with GenAI (Part 2)

Tài liệu này hướng dẫn chi tiết các bài thực hành (Labs) nhằm tối ưu hóa mã nguồn và chuyên biệt hóa mô hình ngôn ngữ lớn (LLM) dựa trên nội dung Chapter 10 và Chapter 11.

---

## 🛠 Chapter 10: Refactoring Code with GenAI

Mục tiêu của các bài lab này là chuyển đổi mã nguồn "tệ" (code smell) thành mã nguồn sạch, dễ bảo trì và có hiệu suất cao bằng kỹ thuật Prompt Engineering.

### Lab 1: Tái cấu trúc cấu trúc (Structural Refactoring)

**Vấn đề:** Một hàm Flask xử lý tính toán khoảng cách ma trận bị trùng lặp logic và khó kiểm thử.

**Mã nguồn cũ (Baseline):**

```python
@app.route("/distances", methods=["POST"])
def calculate_distance():
    data = request.get_json()
    dist_type = data.get("distance")
    if dist_type == "L1":
        # ... logic tính L1 ...
        a = data.get("df1")
        b = data.get("df2")
        dist = np.sum(np.abs(a - b))
        return jsonify({"distance": dist})
    elif dist_type == "L2":
        # ... logic tính L2 với vòng lặp for lồng nhau ...
        # [cite: 821, 825, 831, 836]
```

**Kỹ thuật thực hiện:** Sử dụng Chain-of-Thought (CoT) để AI xác định luồng xử lý cao cấp trước khi đi vào chi tiết.

**Prompt mẫu:**

```text
CONTEXT: Cung cấp hàm cũ trong thẻ {{{ OLD }}}.
TASK: Triển khai các hàm con dựa trên cấu trúc mới: parse_request_parameters, get_manhattan_dist, và get_euclidean_dist.
```

**Phân tích kết quả:**

- **Tính trừu tượng:** Tách biệt việc phân tích request và logic tính toán.
- **Tính tái sử dụng:** Các hàm helper có thể được unit test độc lập mà không cần mock HTTP request.

### Lab 2: Tối ưu hóa hiệu suất (Performance Refactoring)

**Vấn đề:** Vòng lặp for lồng nhau để tính Euclidean distance gây thắt nút cổ chai về thời gian chạy.

**Mã nguồn thực thi (Vectorized):**

```python
import numpy as np

def get_euclidean_dist(a, b):
    # Sử dụng thư viện NumPy để tính toán vector hóa
    diff = np.asarray(a) - np.asarray(b)
    return np.linalg.norm(diff)
    # [cite: 1382, 1383, 1395]
```

**Phân tích kỹ thuật:**

- **Cơ chế:** Thay thế tính toán tuần tự bằng phép toán ma trận của NumPy để tận dụng bộ nhớ đệm và tính toán song song.
- **Kỹ thuật Prompt:** Sử dụng "Cue" (gợi ý) bằng cách viết tên biến và gọi thư viện `np.` để định hướng AI.

---

## 🧠 Chapter 11: Fine-Tuning Models with OpenAI

Bài lab này tập trung vào việc tạo ra một phiên bản "Specialist" của GPT-4o mini, chuyên tạo code sạch mà không cần giải thích rườm rà.

### Lab 1: Xây dựng Dataset JSONL tương phản

**Yêu cầu:** Tạo tập tin huấn luyện tối thiểu 10 ví dụ (thực tế dùng 15) theo định dạng tin nhắn của OpenAI.

**Cấu trúc một ví dụ tương phản (Contrastive Learning):**

```json
{
  "messages": [
    {"role": "system", "content": "You are a clean code specialist."},
    {"role": "user", "content": "FUNCTION: {{{def sum_of_squares(n: int) -> int:}}} CODE:"},
    {"role": "assistant", "content": "Sure! Here is the code... [giải thích]", "weight": 0},
    {"role": "user", "content": "Include only code."},
    {"role": "assistant", "content": "def sum_of_squares(n: int):\n return sum(i**2 for i in range(1, n+1))", "weight": 1}
  ]
}
// [cite: 262, 265, 267, 269]
```

**Phân tích chiến lược:**

- **Weights:** Gán `weight: 0` cho đầu ra chứa giải thích thừa và `weight: 1` cho mã nguồn sạch.
- **Mục tiêu:** Huấn luyện mô hình nhận diện ranh giới giữa phong cách "Chatbot" thông thường và phong cách "Engineer" chuyên nghiệp.

### Lab 2: Kiểm thử và So sánh (Quadratic Roots Benchmark)

**Bài toán:** Triển khai hàm tính nghiệm thực của phương trình bậc hai $ax^2+bx+c=0$.

**So sánh kết quả:**

| Tiêu chí | Base Model (GPT-4o mini) | Fine-tuned Model |
|---|---|---|
| Nội dung | Bao gồm giải thích công thức, bước giải và code có nhiều comment. | Chỉ trả về code sạch, tự động tách hàm helper. |
| Số lượng Token | 535 tokens | 179 tokens |
| Chi phí sử dụng | Rẻ ($0.15 - $0.60/1M tokens) | Gấp đôi Base Model nhưng hiệu quả hơn do token output ngắn. |

**Mã nguồn đầu ra của mô hình Fine-tuned:**

```python
def get_quadratic_roots_only_if_real(a: int, b: int, c: int) -> Tuple[float, float]:
    discriminant = calculate_discriminant(a, b, c)
    if discriminant < 0:
        raise ValueError("Complex roots")
    return calculate_quadratic_roots(a, b, discriminant)
# [cite: 688, 689, 691, 692]
```

---

## 🏁 Tổng kết Labs

- **Chapter 10** cho thấy sức mạnh của CoT trong việc tái cấu trúc logic phức tạp mà IDE thông thường không làm được.
- **Chapter 11** chứng minh rằng Fine-tuning là khoản đầu tư xứng đáng cho các dự án quy mô lớn để đảm bảo tính nhất quán của code và tối ưu hóa chi phí token dài hạn.
