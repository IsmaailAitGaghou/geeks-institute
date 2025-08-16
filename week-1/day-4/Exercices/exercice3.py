from exercice2 import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(f"{self.bark()}")
        self.trained = True

    def play(self, *args):
        print(f"{', '.join(args)} all play together!")

    def do_a_trick(self,):
        tricks = [
            f"{self.name} does a barrel roll",
            f"{self.name} stands on his back legs",
            f"{self.name} shakes your hand",
            f"{self.name} plays dead"
        ]
        if self.trained:
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet.")

if __name__ == "__main__":
    # Create PetDog instances
    buddy = PetDog("Buddy", 5, 30)
    max_dog = PetDog("Max", 4, 25)
    rocky = PetDog("Rocky", 3, 20)

    buddy.train()  
    
    buddy.play(max_dog.name, rocky.name) 

    max_dog.do_a_trick()  
    buddy.do_a_trick()
