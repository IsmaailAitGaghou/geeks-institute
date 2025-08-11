# Exercise 6: tuple

#No , in python tuples are immutable, which mean once they are created, their elements cannot be changed or removed.

# Exercise 7: List

basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print(basket.count("Apples"))
basket.clear()
print(basket)