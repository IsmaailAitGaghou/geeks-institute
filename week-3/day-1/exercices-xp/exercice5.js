const Family = {
    "name": "John",
    "age": 30,
    "relation": "father"
}

for (let key in Family) {
    console.log(key);
}

for (let value in Family) {
    console.log(Family[value]);
}

// Exercice 6:

const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer",
};
let sentence = "";
for (let key in details) {
    sentence += `${key} ${details[key]} `;
}
console.log(sentence);