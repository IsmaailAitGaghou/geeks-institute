// Exercise 1: Colors
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach((element, i) => {
  console.log(`${i + 1}# choice is ${element}`);
});

if (colors.includes("Violet")) {
  console.log("Yeah");
} else {
  console.log("No...");
}

// Exercise 2: Colors #2

const colors1 = [
  "Blue",
  "Green",
  "Red",
  "Orange",
  "Violet",
  "Indigo",
  "Yellow",
];
const ordinal = ["th", "st", "nd", "rd"];

colors1.forEach((element, i) => {
  let suffix = ordinal[0];
  suffix = i + 1 < 20 ? ordinal[i + 1] || ordinal[0] : suffix;
  console.log(`${i + 1}${suffix} choice is ${element}`);
});

// Exercise 3: Colors #3

// ------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ["bread", ...vegetables, "chicken", ...fruits];
console.log(result);
// ["bread", "carrot", "potato", "chicken", "apple", "orange"]

// ------2------
const country = "USA";
console.log([...country]);
// ["U", "S", "A"];

// ------Bonus------
let newArray = [...[, ,]];
console.log(newArray);
// [undefined, undefined, undefined]

// Exercise 4: Employees

const users = [
  { firstName: "Bradley", lastName: "Bouley", role: "Full Stack Resident" },
  { firstName: "Chloe", lastName: "Alnaji", role: "Full Stack Resident" },
  { firstName: "Jonathan", lastName: "Baughn", role: "Enterprise Instructor" },
  { firstName: "Michael", lastName: "Herman", role: "Lead Instructor" },
  { firstName: "Robert", lastName: "Hajek", role: "Full Stack Resident" },
  { firstName: "Wes", lastName: "Reid", role: "Instructor" },
  { firstName: "Zach", lastName: "Klabunde", role: "Instructor" },
];

const welcomeStudents = users.map((user) => {
  return `Hello ${user.firstName}`;
});

console.log(welcomeStudents);

const fullStackResidents = users.filter((user) => {
  return user.role === "Full Stack Resident";
});

console.log(fullStackResidents);

const lastNamesOfResidents = users
  .filter((user) => user.role === "Full Stack Resident")
  .map((user) => user.lastName);

console.log(lastNamesOfResidents);

// Exercise 5: Star Wars

const epic = ["a", "long", "time", "ago", "in a", "galaxy", "far far", "away"];
const sentence = epic.reduce((acc, curr) => acc + " " + curr);
console.log(sentence);


// Exercise 6: Employees #2

const students = [
  { name: "Ray", course: "Computer Science", isPassed: true },
  { name: "Liam", course: "Computer Science", isPassed: false },
  { name: "Jenner", course: "Information Technology", isPassed: true },
  { name: "Marco", course: "Robotics", isPassed: true },
  { name: "Kimberly", course: "Artificial Intelligence", isPassed: false },
  { name: "Jamie", course: "Big Data", isPassed: false },
];

let passedStudents = students.filter((student) => student.isPassed);

console.log(passedStudents);

passedStudents.forEach((student) => {
  console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
});

