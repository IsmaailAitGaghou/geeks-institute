class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type, count= 1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
        print(f"{count} {animal_type}(s) have been added to the farm.")

    def get_info(self):
        print(f"{self.name}'s farm")
        for animal, count in self.animals.items():
            print(f"{animal}: {count}")
        print("-".join("EIEI0!"))

    def get_animal_types(self):
        print(list(sorted(self.animals.keys())))

    def get_short_info(self):
        
        print(f"{self.name}'a farm has {", ".join(self.animals.keys())}.")
    

macdonald = Farm("McDonald")
macdonald.add_animal("cow", 5)
macdonald.add_animal("sheep")
macdonald.add_animal("sheep")
macdonald.add_animal("goat", 12)
macdonald.get_info()
macdonald.get_animal_types()
macdonald.get_short_info()