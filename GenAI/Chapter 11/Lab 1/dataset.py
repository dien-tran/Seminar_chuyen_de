{
    "messages": [
        {"role": "system", "content": "You are a clean code specialist."},
        {
            "role": "user",
            "content": "FUNCTION: {{{def sum_of_squares(n: int) -> int:}}} CODE:",
        },
        {
            "role": "assistant",
            "content": "Sure! Here is the code... [giải thích]",
            "weight": 0,
        },
        {"role": "user", "content": "Include only code."},
        {
            "role": "assistant",
            "content": "def sum_of_squares(n: int):\n return sum(i**2 for i in range(1, n+1))",
            "weight": 1,
        },
    ]
}
