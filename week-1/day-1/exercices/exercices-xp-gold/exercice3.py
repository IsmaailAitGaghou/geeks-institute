# Exercice 3: While Loop
my_name = "Ismail"
while True:
    name  = input("Enter your name: ").capitalize()
    if name == my_name:
        print("Welcome, Ismail!")
        break

# exercice 4: Check the index

names = ["Samus", "Cortana", "V", "Link", "Mario", "Cortana", "Samus"]

name_to_check = input("Enter your name to check the index: ").capitalize()

for name in names:
    if name == name_to_check:
        index = names.index(name)
        print(f"Your name is at index {index}.")
        break

# Exercise 5: Greatest Number

first_number = int(input("Enter the first number: "))
second_number = int(input("Enter the second number: "))
third_number = int(input("Enter the third number: "))

greatest_number = max(first_number, second_number, third_number)
print(f"The greatest number is {greatest_number}.")
