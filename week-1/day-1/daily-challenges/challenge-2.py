users_word = str(input("Enter a word: "))

new_users_word = ""

for i in range(len(users_word)):
    if new_users_word == "" :
        new_users_word += users_word[i]
    elif users_word[i] != users_word[i - 1]:
        new_users_word += users_word[i]
print(new_users_word)