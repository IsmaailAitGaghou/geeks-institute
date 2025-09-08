let client = "John";

const groceries = {
  fruits: ["pear", "apple", "banana"],
  vegetables: ["tomatoes", "cucumber", "salad"],
  totalPrice: "20$",
  other: {
    paid: true,
    meansOfPayment: ["cash", "creditCard"],
  },
};

const displayGroceries = () => {
  groceries.fruits.forEach((fruit) => console.log(fruit));
};

displayGroceries();

const cloneGroceries = () => {
  let user = client;

  client = "Betty";

  console.log("user:", user);
  console.log("client:", client); 

  // Strings are primitive types passed by value.
  // Changing 'client' does not affect 'user', because 'user' got a copy of the value.

  let shopping = groceries;

  shopping.totalPrice = "35$";

  console.log("groceries.totalPrice:", groceries.totalPrice);
  console.log("shopping.totalPrice:", shopping.totalPrice);

  // Objects are passed by reference.
  // 'shopping' and 'groceries' point to the same object in memory.
  // so changing one affects the other.

  shopping.other.paid = false;

  console.log("groceries.other.paid:", groceries.other.paid);
  console.log("shopping.other.paid:", shopping.other.paid);

  // since 'shopping' references the same object as 'groceries',
  // nested properties are also shared. Changing 'shopping.other.paid' affects 'groceries.other.paid'.
};

cloneGroceries()