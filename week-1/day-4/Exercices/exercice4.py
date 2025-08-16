class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, **kwargs):
        self.members.append(kwargs)
        print(f"Congratulations to the {self.last_name} family on the birth of {kwargs['name']}!")

    def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        return False

    def family_presentation(self):
        print(f"The {self.last_name}")
        for member in self.members:
            for key, value in member.items():
                print(f"{key}: {value}")
                
family = Family("Smith")

family.members = [
    {"name": "Michael", "age": 35, "gender": "Male", "is_child": False},
    {"name": "Sarah", "age": 32, "gender": "Female", "is_child": False},
]

family.family_presentation()

family.born(name="Ismaail", age=1, gender = 'Male', is_child = True)


print(family.is_18("Michael"))
print(family.is_18("Sarah"))
print(family.is_18("Ismaail"))
