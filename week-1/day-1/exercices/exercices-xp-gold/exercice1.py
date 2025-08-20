# Exercice 1: What's the season?
month = int(input("Enter the month (1-12): "))

if month == 3 or month == 4 or month == 5:
    season = "It's Spring!"
elif month == 6 or month == 7 or month == 8:
    season = "It's Summer!"
elif month == 9 or month == 10 or month == 11:
    season = "It's Autumn!"
elif month == 12 or month == 1 or month == 2:
    season = "It's Winter!"

if season:
    print("The season is " + season)

# Exercice 2: For Loop
numbers = list(range(1, 21))

for i in range(1, len(numbers) + 1):
    print(i, end=" ")
print()
for i in range(len(numbers)):
    if i % 2 == 0:
        print(numbers[i])
