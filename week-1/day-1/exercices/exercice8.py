sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]

while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")

for sandwich in sandwich_orders:
    print(f"I made your {sandwich}")


finished_sandwiches = []

for sandwich in sandwich_orders:
    current_sandwich = sandwich
    finished_sandwiches.append(current_sandwich)
    print(f"I made your {current_sandwich.lower()}")
