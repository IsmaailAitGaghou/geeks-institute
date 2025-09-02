// Exercise 3:

function isPalindrome(str) {
  let reversed = str.split("").reverse().join("");
  return str === reversed;
}

console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));

// Exercise 4:
function biggestNumberInArray(arrayNumber) {
    let biggest = arrayNumber[0];

    for (let i = 1; i < arrayNumber.length; i++) {
        if (arrayNumber[i] > biggest) {
            biggest = arrayNumber[i];
        }
    }
    return biggest;
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99]));

