class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        print(f"{self.name} is barking!")
    
    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        if self.run_speed() > other_dog.run_speed():
            print(f"{self.name} wins the fight against {other_dog.name}!")
        else:
            print(f"{other_dog.name} wins the fight against {self.name}!")
    

# dog1 = Dog("Buddy", 3, 20)
# dog2 = Dog("Max", 5, 25)
# dog3 = Dog("Charlie", 2, 15)

# dog1.bark()
# dog2.bark()
# dog3.bark()

# dog1.fight(dog2)
# print("-" * 20)
# dog2.fight(dog3)
# print("-" * 20)
# dog3.fight(dog1)
# print("-" * 20)
# dog1.fight(dog3)
# print("-" * 20)
# dog2.fight(dog1)
# print("-" * 20)
# dog3.fight(dog2)