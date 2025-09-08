// #1
function funcOne() {
  let a = 5;
  if (a > 1) {
    a = 3;
  }
  alert(`inside the funcOne function ${a}`);
}

// #1.1 - run in the console:
funcOne();
// Will alert "inside the funcOne function 3"

// #1.2 What will happen if the variable is declared
// with const instead of let ?

// // It will throw an error because we can't reassign a constant variable.

//#2
// let a = 0;
function funcTwo() {
  a = 5;
}

function funcThree() {
  alert(`inside the funcThree function ${a}`);
}

// #2.1 - run in the console:
funcThree(); // will alert "inside the funcThree function 0"
funcTwo();  // reassign the value of 'a' to 5
funcThree(); // will alert "inside the funcThree function 5"

// Global variable 'a' starts at 0
// First funcThree() call shows a = 0
// funcTwo() modifies the global 'a' to 5 (no local declaration, so it refers to global)
// Second funcThree() call shows a = 5

// #2.2 What will happen if the variable is declared
// with const instead of let ?

// It will throw an error when funcTwo() executes because it tries to reassign a constant variable.

//#3
function funcFour() {
  window.a = "hello";
}

function funcFive() {
  return(`inside the funcFive function ${a}`);
}

// #3.1 - run in the console:
funcFour(); // creates global property a = "hello"
funcFive(); // Will alert "inside the funcFive function hello"


// #4
// let a = 1;
function funcSix() {
  let a = "test";
  alert(`inside the funcSix function ${a}`);
}

// #4.1 - run in the console:
funcSix(); // Will alert "inside the funcSix function test"
// Global 'a' is 1, but funcSix has its own local 'a' which is "test"

// #4.2 What will happen if the variable is declared
// with const instead of let ?

// It will work the same way because 'a' is not being reassigned within funcSix.

// //#5
let a = 2;
if (true) {
  let a = 5;
  alert(`in the if block ${a}`); 
}
alert(`outside of the if block ${a}`); 

// // #5.1 - run the code in the console

// first alert: "in the if block 5" because it refers to the block-scoped 'a' declared in the if statement
// second alert: "outside of the if block 2" because it refers to the global 'a'

// // #5.2 What will happen if the variable is declared
// // with const instead of let ?

// Both let and const create block-scoped variables
// The scoping behavior is identical
// const just adds the restriction that the variable cannot be reassigned
// Since we're not reassigning the block-scoped 'a', const works the same as let