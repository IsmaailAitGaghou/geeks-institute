// Exercise 5:
class Dog {
  constructor(name) {
    this.name = name;
  }
};
// 2
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};

// Exercise 6:
// [2] === [2] // false
// {} === {} // error

const object1 = { number: 5 };
const object2 = object1;
const object3 = object2;
const object4 = { number: 5 };

object1.number = 4;
console.log(object2.number); 
// 4
console.log(object3.number); 
// 4
console.log(object4.number); 
// 5

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  constructor(name, type, color) {
    super(name, type, color);
  }
  sound(sound) {
    console.log(`${this.name} is a ${this.color} ${this.type} and makes a ${sound} sound.`);
  }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white");
farmerCow.sound("moo");
// "Lily is a brown and white cow and makes a moo sound."