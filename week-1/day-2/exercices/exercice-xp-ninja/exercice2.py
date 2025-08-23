# Exercice 2:
def get_full_name(first_name, last_name, middle_name=None):
    if middle_name:
        return f"{first_name} {middle_name} {last_name}"
    else:
        return f"{first_name} {last_name}"


print(get_full_name("ismail", "gaghou", "ait"))
print(get_full_name("ismail", "gaghou"))

# Exercice 3:
morse_code_dict = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
    " ": "/",
}

english_dict = {value: key for key, value in morse_code_dict.items()}


def english_to_morse(text):
    
    text = text.upper()
    morse = []
    for char in text:
        if char in morse_code_dict:
            morse.append(morse_code_dict[char])
        else:
            continue
    return " ".join(morse)


def morse_to_english(morse):
    
    words = morse.split(" / ")  # Split by word separator
    decoded_message = []

    for word in words:
        letters = word.split(" ")  # Split by space between letters
        decoded_word = "".join(
            english_dict.get(letter, "") for letter in letters if letter
        )
        decoded_message.append(decoded_word)

    return "".join(decoded_message).capitalize()

    # Test English to Morse
english = "Hello World"
morse = english_to_morse(english)
print(f"English: {english}")
print(f"Morse: {morse}")

morse_input = ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
english_back = morse_to_english(morse_input)
print(f"Decoded: {english_back}")
