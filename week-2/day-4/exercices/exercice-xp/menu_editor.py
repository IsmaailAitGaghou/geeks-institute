from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("User Menu:")
        print("View an Item (V)")
        print("Add an Item (A)")
        print("Delete an Item (D)")
        print("Update an Item (U)")
        print("Show the menu (S)")
        print("Exit (E)")

        choice = input("Enter your choice: ").upper()
        if choice == "V":
            view_item()
        elif choice == "A":
            add_item_to_menu()
        elif choice == "D":
            remove_item_from_menu()
        elif choice == "U":
            update_item_from_menu()
        elif choice == "S":
            show_restaurant_menu()
        elif choice == "E":
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")

def view_item():
    name = input("Enter the name of the item to view: ")
    item = MenuManager.get_by_name(name)
    if item:
        print(f"Name: {item.name}, Price: {item.price}")
    else:
        print("Item not found.")

def add_item_to_menu():
    name = input("Enter the name of the item: ")
    price = int(input("Enter the price of the item: "))
    item = MenuItem(name, price)
    item.save()
    print("Item was added successfully.")

def remove_item_from_menu():
    name = input("Enter the name of the item to delete: ")
    item = MenuManager.get_by_name(name)
    if item:
        item.delete()
        print(f"Item {name} was deleted successfully.")
    else:
        print("Item not found.")

def update_item_from_menu():
    old_name = input("Enter the name of the item to update: ")
    item = MenuManager.get_by_name(old_name)
    if not item:
        print(f"Item {old_name} not found.")
        return
    
    new_name = input("Enter the new name of the item: ")
    new_price = int(input("Enter the new price of the item: "))
    try:
        item.update(new_name, new_price)
        print(f"Item {old_name} was updated to {new_name} successfully.")
    except Exception as e:
        print(f"Error updating item: {e}")

def show_restaurant_menu():
    items = MenuManager.all_items()
    if not items:
        print("No items found.")
        return
    print("Restaurant Menu:")
    for item in items:
        print(f"Name: {item.name}, Price: {item.price}")

if __name__ == "__main__":
    show_user_menu()