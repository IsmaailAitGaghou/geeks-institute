// Exercise 1
let result = 0
function displayNumbersDivisible() {
  for (let i = 0; i <= 500; i++) {
    if (i % 23 === 0) {
      console.log(i);

      result += i;
    }
  }
  console.log("Sum of numbers divisible by 23:", result);
}

function displayNumbersDivisible2(divisor) {
  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      result += i;
    }
  }
  console.log("Sum of numbers divisible by", divisor + ":", result);
}

displayNumbersDivisible();
displayNumbersDivisible2(4);