# 📚 Hướng Dẫn Chi Tiết Thực Hiện Bài Tập Chapter 6

## 🎯 Mục Tiêu Bài Tập

Tạo ra **văn bản nhân tạo** bằng cách phân tích tần suất n-gram từ corpus Reuters dataset.

---

## 📋 Các Bước Thực Hiện

### **Bước 1: Chuẩn Bị Môi Trường**

```python
# Các thư viện cần thiết
import pandas as pd
import os
import re
import pickle
import random
```

**Thiết lập đường dẫn:**
```python
import os
directory = os.getcwd()  # Sử dụng thư mục hiện tại
print(f"Working directory: {directory}")
```

---

### **Bước 2: Tải Dữ Liệu Reuters**

1. Tải từ: https://kdd.ics.uci.edu/databases/reuters21578/
2. Giải nén vào thư mục `ch6/`
3. Sẽ có nhiều file `.sgm` (Standard Generalized Markup Language)

**Kiểm tra dữ liệu:**
```python
sgm_files = [f for f in os.listdir(directory) if f.endswith('.sgm')]
print(f"Found {len(sgm_files)} .sgm files")
```

---

### **Bước 3: Xử Lý Dữ Liệu**

#### **Hàm 1: Trích xuất nội dung từ thẻ `<BODY>`**
```python
def extractBodyTextFromFile(filename):
    '''Tìm và trích xuất nội dung giữa <BODY> và </BODY>'''
    # Đọc file line by line
    # Xác định khi nào vào/ra khối BODY
    # Return danh sách các dòng text
```

#### **Hàm 2: Chuẩn hóa văn bản**
```python
def preprocess(text_block):
    '''Chuyển thành chữ thường, xóa khoảng trắng dư thừa'''
    text = ' '.join(text_block)
    text = re.sub(r'[\s\r\n]+', ' ', text).lower()
    return text.strip()
```

#### **Hàm 3: Đếm tần suất n-gram**
```python
def computeFrequencies(text, ngram_len, frequencies):
    '''Duyệt text, tách n-gram, đếm tần suất'''
    for i in range(len(text)-ngram_len):
        key = text[i:i+ngram_len]
        frequencies[key] = frequencies.get(key, 0) + 1
    return frequencies
```

#### **Hàm 4: Lọc bỏ ký tự không hợp lệ**
```python
def purge_nonletters(ngrams):
    '''Chỉ giữ n-gram chứa chữ cái (a-z) và khoảng trắng'''
    to_delete = [key for key in ngrams if not re.match(r'^[a-z\s]+$', key)]
    for key in to_delete:
        ngrams.pop(key, None)
    return ngrams
```

#### **Hàm 5: Hàm chính xử lý tất cả file**
```python
def computeFreq(directory, ngram_len):
    '''Lặp qua tất cả .sgm files, tính n-gram frequencies'''
    sgm_files = [f for f in os.listdir(directory) if f.endswith('.sgm')]
    ngram_freq = {}
    for file in sgm_files:
        text_blocks = extractBodyTextFromFile(os.path.join(directory, file))
        cleaned_text = preprocess(text_blocks)
        ngram_freq = computeFrequencies(cleaned_text, ngram_len, ngram_freq)
        purge_nonletters(ngram_freq)
    return ngram_freq
```

---

### **Bước 4: Tính Toán & Lưu N-gram (⏱️ ~100 giây)**

```python
MAX_NGRAM_SIZE = 7

for ngrami in range(1, MAX_NGRAM_SIZE+1):
    print(f'Processing ngram size {ngrami}...')
    freqOutput = computeFreq(directory, ngrami)
    # Lưu vào pickle file
    with open(os.path.join(directory, f'freq{ngrami}.pkl'), 'wb') as f:
        pickle.dump(freqOutput, f)
    print(f'Dictionary size: {len(freqOutput)}')
```

**Kết quả:**
| N-gram | Số entries |
|--------|-----------|
| 1 | 27 |
| 2 | 703 |
| 3 | 9,860 |
| 4 | 53,912 |
| 5 | 172,338 |
| 6 | 420,485 |
| 7 | 823,342 |

---

### **Bước 5: Tạo Tần Suất Chữ Cái Riêng Lẻ**

```python
def computeIndividualLetterFrequencies(directory):
    '''Đếm tần suất từng chữ cái'''
    letter_frequencies = {u: 0 for u in 'abcdefghijklmnopqrstuvwxyz'}
    # Lặp qua tất cả file, đếm từng ký tự
    return letter_frequencies

# Lưu vào CSV
df = pd.DataFrame(list(letter_frequencies.items()), 
                  columns=['letter', 'frequency'])
df = df.sort_values(by='frequency', ascending=False)
df.to_csv('letter_frequencies.csv', index=False)
```

**Kết quả:** File `letter_frequencies.csv` chứa tần suất từng ký tự

---

### **Bước 6: Sinh Văn Bản Từ Tần Suất Ký Tự Đơn Lẻ**

```python
def loadNormalizePkl1(filename):
    '''Load và chuẩn hóa dữ liệu pickle'''
    with open(filename, 'rb') as f:
        data = pickle.load(f)
    # Chia tất cả giá trị cho tổng (tạo xác suất)
    totalsum = sum(data.values())
    return {k: v/totalsum for k, v in data.items()}

# Sinh 10 dòng, mỗi dòng 70 ký tự
data = loadNormalizePkl1(os.path.join(directory, 'freq1.pkl'))
random.seed(41)

for _ in range(10):
    outputstr = ''
    for _ in range(70):
        # Chọn ký tự ngẫu nhiên dựa xác suất
        prob = random.uniform(0.0, 1.0)
        cumsum = 0
        for key, val in data.items():
            cumsum += val
            if cumsum >= prob:
                outputstr += key
                break
    print(outputstr)
```

**Kết quả:** Văn bản rác, chỉ là ký tự ngẫu nhiên

---

### **Bước 7: Sinh Văn Bản Từ N-gram (Chất Lượng Cao Hơn)**

```python
def loadNormalizePkln(filename):
    '''Chuẩn hóa n-gram theo prefix (n-1 ký tự đầu)'''
    with open(filename, 'rb') as f:
        data = pickle.load(f)
    # Tính tổng cho mỗi prefix
    norm = {}
    for key in data.keys():
        prefix = key[:-1]  # Bỏ ký tự cuối
        norm[prefix] = norm.get(prefix, 0) + data[key]
    # Chuẩn hóa
    for key in data:
        prefix = key[:-1]
        data[key] = data[key] / norm[prefix]
    return data

def find_prob_string(prob, data, ngram):
    '''Tìm ký tự tiếp theo dựa xác suất'''
    cumsum = 0.0
    for key in data:
        if key.startswith(ngram):
            cumsum += data[key]
            if cumsum >= prob:
                return key[-1]
    return None

def createNgramStr(directory, ngram):
    '''Sinh chuỗi ký tự từ n-gram'''
    NUM_LINES = 5
    LETTERS_PER_LINE = 70
    
    data = loadNormalizePkln(os.path.join(directory, f'freq{ngram}.pkl'))
    random.seed(422)
    
    for _ in range(NUM_LINES):
        outputstr = random.choice(list(data.keys()))  # Ký tự bắt đầu
        for _ in range(LETTERS_PER_LINE):
            prob = random.uniform(0.0, 1.0)
            nextchar = find_prob_string(prob, data, outputstr[-ngram+1:])
            if nextchar:
                outputstr += nextchar
        print(outputstr)

# Chạy với ngram_len = 5
createNgramStr(directory, 5)
```

---

## 📊 Kết Quả So Sánh

### **N-gram size = 2** (Văn bản rác)
```
wmarerye icose verhe herer duvoucrpa tilllarast itout f cts coles t tere
```

### **N-gram size = 3** (Bắt đầu có từ)
```
laa fith any sh wilhipect thenbleraqi alevid can of the sid in majoin sai
```

### **N-gram size = 5** (Văn bản hợp lý)
```
frn in and corp told keeping an from years to market of about there listerd
```

### **N-gram size = 7** (Gần như tiếng Anh thực tế!)
```
aize subsidized by nippon is expects offer of the agreement earlier today to
```

---

## 🔍 Giải Thích Nguyên Lý

1. **Tần suất ký tự đơn** → Văn bản chỉ là ký tự ngẫu nhiên (nhưng tuân theo phân bố)
2. **N-gram nhỏ** → Hạn chế tương tác, kết quả rác
3. **N-gram lớn** → Lưu trữ nhiều mẫu, sinh ra văn bản gần với thực tế
4. **N-gram rất lớn** → Có thể sinh ra câu từ training data

---

## 📁 File Kết Quả

```
ch6/
├── freq1.pkl          → 27 ký tự
├── freq2.pkl          → 703 cặp ký tự
├── freq3.pkl          → 9,860 3-gram
├── freq4.pkl          → 53,912 4-gram
├── freq5.pkl          → 172,338 5-gram
├── freq6.pkl          → 420,485 6-gram
├── freq7.pkl          → 823,342 7-gram
├── letter_frequencies.csv  → Tần suất ký tự
└── freq2tbl.csv        → Bảng 2D tần suất
```

---

## ✅ Kiểm Tra Hoàn Thành

- [x] Tải Reuters dataset (22 files)
- [x] Tính n-gram frequencies (1-7)
- [x] Tạo file tần suất
- [x] Sinh văn bản từ tần suất ký tự
- [x] Sinh văn bản từ n-gram
- [x] So sánh chất lượng ở các kích thước khác nhau

---

## 💡 Mẹo Nâng Cao

1. **Thay đổi `ngram_len`** từ 2 đến 7 để xem chất lượng thay đổi
2. **Thay đổi `NUM_LINES` và `LETTERS_PER_LINE`** để tạo nhiều text hơn
3. **Phân tích `letter_frequencies.csv`** để hiểu phân bố ký tự tiếng Anh
4. **Vẽ biểu đồ `freq2tbl.csv`** để trực quan hóa cặp ký tự

---

## 📚 Tài Liệu Tham Khảo

- **Reuters Dataset:** https://kdd.ics.uci.edu/databases/reuters21578/
- **N-gram:** https://en.wikipedia.org/wiki/N-gram
- **Markov Chain:** https://en.wikipedia.org/wiki/Markov_chain

---

**Hoàn thành ngày:** 16/03/2026 ✨
