class BankAccount:
    def __init__(self, balance, username, password):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform this action")
        if amount <= 0:
            raise Exception("Deposit amount must be a positive integer")
        self.balance += amount

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform this action")
        if amount <= 0:
            raise Exception("Withdraw amount must be a positive integer")

        self.balance -= amount

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
        return self.authenticated


class MinimumBalanceAccount(BankAccount):

    def __init__(self, balance, username, password, minimum_balance = 0):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Withdrawal denied. Balance cannot go below {self.minimum_balance}.")
        self.balance -= amount

