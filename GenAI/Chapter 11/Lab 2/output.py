def get_quadratic_roots_only_if_real(a: int, b: int, c: int) -> Tuple[float, float]:
    discriminant = calculate_discriminant(a, b, c)
    if discriminant < 0:
        raise ValueError("Complex roots")
    return calculate_quadratic_roots(a, b, discriminant)
