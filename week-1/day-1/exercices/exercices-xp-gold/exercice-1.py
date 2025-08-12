my_name = "ismail"
while True:
    name = str(input("What's your name? "))
    if name == my_name:
        print("Hello Ismail!")
        break
print("Goodbye!")


names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

name = str(input("Enter a name: ").capitalize())

for n in range(len(names)):
    if names[n] == name:
        print(names[name])
