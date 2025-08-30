// Exercice 1:
let numbers = [123, 8409, 100053, 333333333, 7];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 3 === 0) {
        console.log(true);
    } else {
        console.log(false);
    }
}

// Exercice 2:
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina",
};

let student = prompt("Enter your name").toLowerCase();

if (guestList[student]) {
  console.log(`Hi! I'm ${student}, and I'm from ${guestList[student]}.`);
} else {
  console.log(`Hi! I'm a guest.`);
}

if (student in guestList) {
  console.log(`Hi! I'm ${student}, and I'm from ${guestList[student]}.`);
} else {
  console.log(`Hi! I'm a guest.`);
}

// Exercice 3:
let age = [20, 5, 12, 43, 98, 55];

let result = 0;

for (let i = 0; i < age.length; i++) {
  result += age[i];
}

console.log(result);

let highestAge = 0;

for (let i = 0; i < age.length; i++) {
  if (age[i] > highestAge) {
    highestAge = age[i];
  }
}
console.log(`the highest is ${highestAge}`);
