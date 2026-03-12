def get_geometric_mean_of_two_numbers(num1, num2) -> float:
    if num1 < 0 or num2 < 0:
        raise ValueError("Both numbers must be non-negative.")
    return (num1 * num2) ** 0.5

num1:float = 5
num2:float = 20
print(get_geometric_mean_of_two_numbers(num1, num2))