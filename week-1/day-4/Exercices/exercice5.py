from exercice4 import Family


class TheIncredibles(Family):
    def use_power(self, name):
        for member in self.members:
            if member["name"].lower() == name.lower():
                if member["age"] >= 18:
                    print(f"{member["name"]} is using their power {member["power"]}!")
                    return
                else:
                    raise Exception(
                        f"{member['name']} is not over 18 years old and cannot use their power!"
                    )

    def incredible_presentation(self):
        print("*Here is our powerful family **")
        super().family_presentation()
        for member in self.members:
            print(
                f"Incredible Name: {member['incredible_name']}, Power: {member['power']}"
            )


if __name__ == "__main__":

    incredibles_members = [
        {
            "name": "Michael",
            "age": 35,
            "gender": "Male",
            "is_child": False,
            "power": "fly",
            "incredible_name": "MikeFly",
        },
        {
            "name": "Sarah",
            "age": 32,
            "gender": "Female",
            "is_child": False,
            "power": "read minds",
            "incredible_name": "SuperWoman",
        },
    ]
    incredibles = TheIncredibles("Incredibles")

    incredibles.incredible_presentation()
    incredibles.born(
        name="Baby Jack",
        age=0,
        gender="Male",
        is_child=True,
        power="unknown",
        incredible_name="BabyJack",
    )
    incredibles.family_presentation()
