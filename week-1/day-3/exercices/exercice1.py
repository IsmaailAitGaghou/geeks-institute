#Exercice 1: Cats
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("Whiskers", 3)
cat2 = Cat("Mittens", 5)
cat3 = Cat("Shadow", 2)

def oldest_cat(cats):
    oldest = cats[0]
    for cat in cats:
        if cat.age > oldest.age:
            oldest = cat
    print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")
    return oldest
oldest_cat([cat1, cat2, cat3])