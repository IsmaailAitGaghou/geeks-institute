const data = [
  {
    name: "Butters",
    age: 3,
    type: "dog",
  },
  {
    name: "Cuty",
    age: 5,
    type: "rabbit",
  },
  {
    name: "Lizzy",
    age: 6,
    type: "dog",
  },
  {
    name: "Red",
    age: 1,
    type: "cat",
  },
  {
    name: "Joey",
    age: 3,
    type: "dog",
  },
  {
    name: "Rex",
    age: 10,
    type: "dog",
  },
];

let sum = 0;

data.forEach((pet) => {
  if (pet.type === "dog") sum += pet.age * 7;
});

console.log(sum);

let dogs = data.filter((pet) => pet.type === "dog");
let dogYears = dogs.map((dog) => dog.age * 7);
let totalDogYears = dogYears.reduce((acc, age) => acc + age, 0);
console.log(totalDogYears);

// Exercise 2: Email

const userEmail3 = " cannotfillemailformcorrectly@gmail.com ";
const userEmailCorrect = userEmail3.trim();
console.log(userEmailCorrect);

// Exercise 3: Employees #3
const users = [
  { firstName: "Bradley", lastName: "Bouley", role: "Full Stack Resident" },
  { firstName: "Chloe", lastName: "Alnaji", role: "Full Stack Resident" },
  { firstName: "Jonathan", lastName: "Baughn", role: "Enterprise Instructor" },
  { firstName: "Michael", lastName: "Herman", role: "Lead Instructor" },
  { firstName: "Robert", lastName: "Hajek", role: "Full Stack Resident" },
  { firstName: "Wes", lastName: "Reid", role: "Instructor" },
  { firstName: "Zach", lastName: "Klabunde", role: "Instructor" },
];

const newUsers = {};
users.reduce((acc, user) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return newUsers[fullName] = user.role;
}, {});

console.log(newUsers);

// Exercise 4: Array To Object

const letters = ["x", "y", "z", "z"];
const letterCounts = {};
for (const letter of letters) {
  letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
}
const lettersObject = letters.reduce((acc, letter) => {
  acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
  return acc;
}, {});
console.log(lettersObject);