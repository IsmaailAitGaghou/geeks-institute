// Exercise 1

let randomNumber = Math.floor(Math.random() * 100) + 1;
for (let i = 0; i <= randomNumber + 1; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Exercise 2
function capitalizeLetters(str) {
  let capitalizedEven = "";
  let capitalizedOdd = "";
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      capitalizedEven += str[i].toUpperCase();
      capitalizedOdd += str[i].toLowerCase();
    } else {
      capitalizedEven += str[i].toLowerCase();
      capitalizedOdd += str[i].toUpperCase();
    }
  }
  return [capitalizedEven, capitalizedOdd];
}

console.log(capitalizeLetters("abcdef"));
