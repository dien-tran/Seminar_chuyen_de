from __future__ import annotations

import random
import argparse
from typing import Optional, Tuple


def ask_question(a: int, b: int) -> bool:
    """Ask a single multiplication question and return True if the user's answer is correct.

    The function loops until the user provides a valid integer answer or types a quit command.
    """
    correct = a * b
    while True:
        ans = input(f"What is {a} × {b}? (or 'q' to quit) ")
        if ans.strip().lower() in ("q", "quit", "exit"):
            # Signal an interrupt to the caller so they can stop the quiz cleanly
            raise KeyboardInterrupt

        try:
            user_ans = int(ans)
        except ValueError:
            print("Please enter an integer answer or 'q' to quit.")
            continue

        if user_ans == correct:
            print("Correct!")
            return True
        else:
            print(f"Incorrect — the correct answer is {correct}.")
            return False


def run_quiz(count: int = 10, seed: Optional[int] = None) -> Tuple[int, int]:
    """Run the quiz for `count` questions.

    Returns a tuple (score, attempted).
    If `seed` is provided the random generator will be seeded for reproducibility.
    """
    if seed is not None:
        random.seed(seed)

    score = 0
    attempted = 0

    try:
        for i in range(1, count + 1):
            a = random.randint(1, 12)
            b = random.randint(1, 12)
            print(f"\nQuestion {i}/{count}:")
            attempted += 1
            if ask_question(a, b):
                score += 1
    except KeyboardInterrupt:
        print("\nQuiz interrupted by user.")

    return score, attempted


def main() -> None:
    parser = argparse.ArgumentParser(description="Run a multiplication quiz (default 10 questions).")
    parser.add_argument("--count", "-n", type=int, default=10, help="Number of questions (default: 10)")
    parser.add_argument("--seed", "-s", type=int, default=None, help="Optional random seed for reproducibility")
    args = parser.parse_args()

    total = max(0, args.count)
    score, attempted = run_quiz(total, args.seed)

    if attempted == 0:
        pct = 0.0
    else:
        pct = score / attempted * 100.0

    print("\nSummary:")
    print(f"Attempted: {attempted}")
    print(f"Correct: {score}")
    print(f"Percentage (of attempted): {pct:.1f}%")


if __name__ == "__main__":
    main()
