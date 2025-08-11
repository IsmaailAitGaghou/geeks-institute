# Exercise 4: Roller Coaster Height Check
your_height = int(input("Type your height in cm: "))

if your_height > 145:
    print("You're tall enough to ride a roller coaster")
else:
    print("You're not tall enough to ride a roller coaster")

# Exercise 5: Favorite Numbers
my_favorite_number = set([7, 14, 21])
my_favorite_number.add(28)
my_favorite_number.add(35)

my_favorite_number.remove(35)
print(my_favorite_number)

friend_fav_numbers = set([3, 14, 9])

our_fav_numbers = my_favorite_number + friend_fav_numbers
print(our_fav_numbers)

