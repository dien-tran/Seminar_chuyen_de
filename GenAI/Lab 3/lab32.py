def get_geometric_mean(*nums)->float:
    if any(num < 0 for num in nums):
        raise ValueError("All numbers must be non-negative.")
    product = 1
    for num in nums:
        product *= num
    return product ** (1/len(nums))
