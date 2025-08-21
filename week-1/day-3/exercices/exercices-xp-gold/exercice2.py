import random
class MyList:
    def __init__(self, letters = []):
        self.letters = letters

    def reversed_list(self):
        return self.letters[::-1]

    def sorted_list(self):
        return sorted(self.letters)

    def generate_list(self, min_value = 1, max_value = 50):
        return [random.randint(min_value, max_value) for letter in self.letters]
        

my_list = MyList([1,4,5,3,2])

print("original list: ", my_list.letters)
print(my_list.reversed_list())
print(my_list.sorted_list())
print("Generated list: ", my_list.generate_list())
