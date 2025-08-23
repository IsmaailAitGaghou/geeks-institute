car_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

manufacturers = [name.strip() for name in car_string.split(",")]

num_manufacturers = len(manufacturers)
print(f"There are {num_manufacturers} manufacturers in the list.")

print("Manufacturers in reverse order (Z-A):")
print(manufacturers[::-1])

count_o = sum(1 for name in manufacturers if "o" in name.lower())
print(f"\nNumber of manufacturers with the letter 'o': {count_o}")

count_no_i = sum(1 for name in manufacturers if "i" not in name.lower())
print(f"Number of manufacturers without the letter 'i': {count_no_i}")

list_of_duplicate_cars = [
    "Honda",
    "Volkswagen",
    "Toyota",
    "Ford Motor",
    "Honda",
    "Chevrolet",
    "Toyota",
]

unique_manufactures = list(set(list_of_duplicate_cars))

formated_string = ", ".join(unique_manufactures)
print(f"Unique manufacturers: {formated_string}")
