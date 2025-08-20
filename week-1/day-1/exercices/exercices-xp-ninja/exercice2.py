# Exercice2:
while True:
    logest_sentence = str(input("Enter the longest sentence you can without the letter 'A': "))

    if "A" in logest_sentence:
        print("You failed I found the letter 'A'")
    else:
        print("Congratulations you successfully.")
        break

# Exercice3:
paraghraph = "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. This includes capabilities like reasoning, learning, problem-solving, perception, and decision-making. AI systems use algorithms and data to perform tasks that typically require human intelligence."

print(len(paraghraph))

words = paraghraph.split()
print(len(words))

unique_words = set(word.lower() for word in words)
print(len(unique_words))
