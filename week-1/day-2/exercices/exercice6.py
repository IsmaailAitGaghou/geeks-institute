#Exercice 6: 
def make_shirt(size = "large", text = "I love Python"):
    print(f"Making a {size} shirt with the text: '{text}'")

make_shirt("medium", "I love Javascript")
make_shirt()  
make_shirt("medium")
make_shirt("small", "I love C++")

make_shirt(size="extra large", text="I love Geeks Institute")

#Exercice 7:
import random
def get_random_temp(season):
    if season == "winter":
        return random.randint(-10, 5)
    
    elif season == "spring":
        return random.randint(5, 20)
    elif season == "summer":
        return random.randint(20, 35)
    elif season == "autumn":
        return random.randint(5, 20)
    else:
        return "enter a valid season"

# global_temp = get_random_temp()
# print(f"the temperature is: {global_temp}degrees Celsius")

def main():
    season = input("Enter the season (winter, spring, summer, autumn): ").lower()
    temp_in_celsius = get_random_temp(season)
    print(f"The temperature today is : {temp_in_celsius}degrees Celsius")

    if temp_in_celsius < 0:
        print("Brrr, that’s freezing! Wear some extra layers today")
    elif temp_in_celsius >= 0 and temp_in_celsius <= 16:
        print("Quite chilly! Don’t forget your coat")
    elif temp_in_celsius > 16 and temp_in_celsius <= 23:
        print("Nice weather! A light jacket should be enough")
    elif temp_in_celsius >= 24 and temp_in_celsius < 32:
        print("Warm weather! A t-shirt is fine")
    else:
        print("It’s hot! Stay hydrated and wear light clothing")

main()