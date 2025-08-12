#Exercice 1: Convert lists into dictionaries
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]


zip_dict = dict(zip(keys, values))
print(zip_dict)

#Exercice 2: Cinemax #2

family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}

def calculate_ticket_price(age):
    if age < 3:
        return 0  
    elif age >= 3 and age <= 12:
        return 10  
    else:
        return 15 

total_cost = 0
for name, age in family.items():
    price = calculate_ticket_price(age)
    total_cost += price
    print(f"{name}: {age} years old - ${price}")

print(f"Total family cost: ${total_cost}")

# Initialize empty dictionary for user input
user_family = {}

number_of_members = int(input("How many family members do you want to add? "))
for i in range(1, number_of_members):
    name = input(f"Enter name of family member {i}: ")
    age = int(input(f"Enter {name}'s age: "))
    user_family[name] = age
