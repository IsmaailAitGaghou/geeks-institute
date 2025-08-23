# Exercice 1:
birthdays = {
    "Alice": "1990/05/15",
    "Bob": "1985/12/03",
    "Charlie": "1992/07/21",
    "Diana": "1988/03/10",
    "Eve": "1995/11/30"
}


name = input("Please enter a person's name: ").strip().capitalize()
if name in birthdays:
    print(f"{name}'s birthday is on {birthdays[name]}.")
else:
    print(f"Sorry, we don't have the birthday information for {name}.")

# Exercice 2:
birthdays = {
    "Alice": "1990/05/15",
    "Bob": "1985/12/03",
    "Charlie": "1992/07/21",
    "Diana": "1988/03/10",
    "Eve": "1995/11/30",
}


print("\nThe following people are in the birthday list:")
for name in birthdays:
    print(f"- {name}")

name = input("\nPlease enter a person's name: ").strip().capitalize()


if name in birthdays:
    print(f"\n{name}'s birthday is {birthdays[name]}.")
else:
    print(f"\nSorry, we don’t have the birthday information for {name}.")
