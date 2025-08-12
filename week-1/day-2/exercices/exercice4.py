#Exercice 4: Some Geography

def describe_city(city_name, country_name = "Unknown"):
    print(f"{city_name} is in {country_name}.")

describe_city("Paris", "France")

#Exercice 5: Random
import random

def compare_numbers(user_number):
    random_number = random.randint(1, 100)
    
    if user_number == random_number:
        print("Success.")
        print("Your number:", user_number)
        print("Random number:", random_number)
    else:
        print("Fail.")
        print("Your number:", user_number)
        print("Random number:", random_number)

compare_numbers(15)