// Exxercise 2:
// function winBattle() {
//   return true;
// }

let winBattle = () => {
  return true;
};

let experiencePoints = winBattle() ? 10 : 1;
console.log(experiencePoints);

// Exercise 3:

let isString = (value) => {
  return typeof value === "string";
};

console.log(isString("hello"));
console.log(isString([1, 2, 4, 0]));

// Exercise 4:

let sumValues = (a, b) => a + b;

console.log(sumValues(3, 5));

// Exercise 5:

function kgToGrams(kilograms) {
  return kilograms * 1000;
}
console.log(kgToGrams(5));

let kgToGrams1 = function (kilograms) {
  return kilograms * 1000;
}
console.log(kgToGrams1(5));

// A function declaration is hoisted and can be called before its definition, while a function expression is not hoisted and can only be called after it has been defined.

let kgToGrams2 = (kilograms) => kilograms * 1000;
console.log(kgToGrams2(5));

// Exercise 6 :

(function(numberChildren, partnerName, geoLocation, jobTitle) {
    console.log(`You will be a ${jobTitle} in ${geoLocation}, and married to ${partnerName} with ${numberChildren} kids.`);
})(2, "Alice", "Wonderland", "Adventurer");
