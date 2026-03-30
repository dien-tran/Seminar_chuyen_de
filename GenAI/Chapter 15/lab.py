def print_fizzbuzz(limit):
    if not isinstance(limit, int):
        raise TypeError(...)
    
    print("Logging...")
    global counter
    counter += 1
    
    # logic fizzbuzz

def log_function_args(func):
    def wrapper(*args, **kwargs):
        logger.info(f"Called with {args}")
        return func(*args, **kwargs)
    return wrapper

def increment_counter(func):
    def wrapper(*args, **kwargs):
        global FIZZBUZZ_COUNTER
        FIZZBUZZ_COUNTER += 1
        return func(*args, **kwargs)
    return wrapper

def validate_args_types_and_limits(min_limit, max_limit):
    def decorator(func):
        def wrapper(limit):
            if not isinstance(limit, int):
                raise TypeError(...)
            if limit < min_limit or limit > max_limit:
                raise ValueError(...)
            return func(limit)
        return wrapper
    return decorator

@validate_args_types_and_limits(0, 500)
@increment_counter
@log_function_args
def print_fizzbuzz(limit):
    for i in range(limit):
        ...