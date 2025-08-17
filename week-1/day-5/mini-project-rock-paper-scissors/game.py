import random

class Game:
    def get_user_item(self):
        while True:
            user_input = input("Select rock, paper, scissors:  ").lower()
            if user_input in ["rock", "paper", "scissors"]:
                return user_input
            else:
                print("Invalid choice. Please try again.")

    def get_computer_item(self):
        return random.choice(["rock", "paper", "scissors"])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif user_item == "rock" and computer_item == "scissors" or \
             user_item == "paper" and computer_item == "rock" or \
             user_item == "scissors" and computer_item == "paper":
            return "win"
        else:
            return "lose"

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        print(f"You selected {user_item}. The computer selected {computer_item}. {self.get_game_result(user_item, computer_item)}")
        result = self.get_game_result(user_item, computer_item)
        print(result)
