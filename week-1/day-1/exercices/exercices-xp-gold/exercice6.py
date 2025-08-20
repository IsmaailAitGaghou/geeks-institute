import random

number = int(input("Enter a number between 1 and 9: "))
random_number = random.randint(1, 9)

if number == random_number:
    print(f"Winner! You guessed the number {random_number}.")
else:
    print(f"Better luck next time! The number was {random_number}")
