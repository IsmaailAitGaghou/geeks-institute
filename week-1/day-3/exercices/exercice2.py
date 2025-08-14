class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof")

    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high")

    def set_age(self, new_age):
        self.age = new_age

davids_dog = Dog("Rex", 50)

print(f"{davids_dog.name} is {davids_dog.height} cm tall")
davids_dog.bark()
davids_dog.jump()

sarahs_dog = Dog("Teacup", 20)
print(f"{sarahs_dog.name} is {sarahs_dog.height} cm tall")
sarahs_dog.bark()
sarahs_dog.jump()

if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is taller than {sarahs_dog.name}")