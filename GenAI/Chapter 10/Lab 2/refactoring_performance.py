import numpy as np


def get_euclidean_dist(a, b):
    # Sử dụng thư viện NumPy để tính toán vector hóa
    diff = np.asarray(a) - np.asarray(b)
    return np.linalg.norm(diff)
