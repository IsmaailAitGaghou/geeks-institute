// Exercise 1 :
function printFullName(Obj) {
    console.log(`Your full name is ${Obj.first} ${Obj.last}`);
}

printFullName({ first: "Elie", last: "Schoppik" });

// Exercise 2 :

function keysAndValues(obj) {
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    keys = keys.sort();
    return [keys, values];
}

console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));

// Exercise 3 :
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count); 
// 3
