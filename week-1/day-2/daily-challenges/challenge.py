word = input("Enter a word: ")

letter_dict = {}

for i in range(len(word)):
    letter = word[i]
    
    if letter in letter_dict:

        letter_dict[letter].append(i)
    else:

        letter_dict[letter] = [i]

print( letter_dict)