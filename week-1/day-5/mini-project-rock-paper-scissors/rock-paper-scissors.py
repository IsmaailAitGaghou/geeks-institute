from game import Game


def get_user_menu_choice():
    while True:
        print("Menu:")
        print("(p) Play a new game")
        print("(x) Show scores and exit")
        choice = input(": ").strip().lower()
        if choice in ["p", "x"]:
            return choice


def print_results(results):
    print("\nGame Results:")
    for i, result in enumerate(results, start=1):
        print(f"Game {i}: {result}")
    print("\nThanks for playing!")


def main():
    results = {"win": 0, "lose": 0, "draw": 0}

    while True:
        choice = get_user_menu_choice()
        if choice == "p":
            game = Game()
            game.play()
            result = game.get_game_result(
                game.get_user_item(), game.get_computer_item()
            )
            results[result] += 1
        elif choice == "x":
            print_results(results)
            break


if __name__ == "__main__":
    main()
