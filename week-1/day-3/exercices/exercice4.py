# Exercise 4 : Afternoon at the Zoo
class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"{new_animal} has been added to the zoo.")

    def get_animals(self):
        print(f"All animals in the Zoo{self.animals}")

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold.")

    def sort_animals(self):
        self.animals.sort()
        self.animal_grouped = {}
        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in self.animal_grouped:
                self.animal_grouped[first_letter] = [animal]
            else:
                self.animal_grouped[first_letter].append(animal)

    def get_groups(self):
        # getgroupe = self.sort_animals()
        if self.animals:
            for letter, animals in self.animal_grouped.items():
                if len(animals) == 1:
                    print(f"{letter}: {animals[0]}")
                else:
                    print(f"{letter}: {animals}")


new_york_zoo = Zoo("New York Zoo")
# zoo_animals = ["Lion", "Tiger", "Bear", "Elephant", "Giraffe", "Zebra", "Goat", "Alligator"]
# for animal in zoo_animals:
#     new_york_zoo.add_animal(animal)
new_york_zoo.add_animal("Elephant")
print("-" * 10)
new_york_zoo.add_animal("Giraffe")
print("-" * 10)
new_york_zoo.add_animal("Zebra")
print("-" * 10)
new_york_zoo.add_animal("Goat")
print("-" * 10)
new_york_zoo.add_animal("Alligator")
print("-" * 10)
new_york_zoo.get_animals()
print("-" * 10)
new_york_zoo.sell_animal("Zebra")
print("-" * 10)
new_york_zoo.sort_animals()
new_york_zoo.get_groups()
# print(getgroup)
