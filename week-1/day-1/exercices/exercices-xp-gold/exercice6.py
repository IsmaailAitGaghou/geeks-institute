import random

score = 0
incorrect_guesses = 0

while True:
    number = int(input("Enter a number between 1 and 9 or 0 to Exit: "))
    random_number = random.randint(1, 9)

    if number == random_number:
        print(f"Winner! You guessed the number right.") 
        score += 1
    else:
        print(f"Better luck next time!.")
        incorrect_guesses += 1

    if number == 0:
        print(f"Exiting! you guessed {score} right and {incorrect_guesses} wrong")
        break
