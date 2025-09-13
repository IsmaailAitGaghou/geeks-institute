// Exercise 1:

[1, 2, 3].map((num) => {
  if (typeof num === "number") return num * 2;
  return;
});

// the output should be [2,4,6]

// Exercise 2:
[
  [0, 1],
  [2, 3],
].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2]
);

// the output should be [1,2,0,1,2,3]

// Exercise 3:

const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
  console.log(num, i);
  //   alert(num);
  return num * 2;
});

// the value of i is the index of the array

// Exercise 4:

const array = [[1], [2], [3], [[[4]]], [[[5]]]];
const newArray1 = array.flat(2);
console.log(newArray1);

const greeting = [
  ["Hello", "young", "grasshopper!"],
  ["you", "are"],
  ["learning", "fast!"],
];

let flatGreeting = greeting.flatMap((x) => x.join(" "));
console.log(flatGreeting.join(" "));

const trapped = [[[[[[[[[[[[3]]]]]]]]]]]];
console.log(trapped.flat(12));
