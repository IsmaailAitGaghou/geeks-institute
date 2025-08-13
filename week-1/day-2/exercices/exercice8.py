data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]

def ask_questions(data):
    correct = 0
    incorrect = 0
    wrong_answers = []

    # for item in data:
    #     user_answer = input(item["question"] + " ").strip()
    #     if user_answer.lower() == item["answer"].lower():
    #         correct += 1
    #     else:
    #         incorrect += 1
    #         wrong_answers.append({
    #             "question": item["question"],
    #             "user_answer": user_answer,
    #             "correct_answer": item["answer"]
    #         })

def ask_questions(data):
    correct = 0
    incorrect = 0
    wrong_answers = []

    for item in data:
        user_answer = input(f"{item['question']} ")
        if user_answer.lower() == item['answer'].lower():
            print("Correct!")
            correct += 1
        else:
            incorrect += 1
            wrong_answers.append({
                "question": item['question'],
                "user_answer": user_answer,
                "correct_answer": item['answer']
            })
            print(f"wrong answer, The correct answer is: {item['answer']}")
    
    
def show_results(correct, incorrect, wrong_answers):
    print(f"\nYou answered {correct} questions correctly and {incorrect} incorrectly.")
    if wrong_answers:
        print("\nHere are the questions you got wrong:")
        for item in wrong_answers:
            print(f"Question: {item['question']}")
            print(f"Your answer: {item['user_answer']}")
            print(f"Correct answer: {item['correct_answer']}\n")
    else:
        print("Great job! You answered all questions correctly.")
ask_questions(data)