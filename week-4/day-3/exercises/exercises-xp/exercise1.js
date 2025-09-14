// Exercise 1:
const person = {
  name: "John Doe",
  age: 25,
  location: {
    country: "Canada",
    city: "Vancouver",
    coordinates: [49.2827, -123.1207],
  },
};

const {
  name,
  location: {
    country,
    city,
    coordinates: [lat, lng],
  },
} = person;

console.log(
  `I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`
);
// "I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)"

// Exercise 2:
function displayStudentInfo(objUser) {
  //destructuring
  const { first, last } = objUser;
  console.log(`Your Full Name is ${first} ${last}`);
}

displayStudentInfo({ first: "Elie", last: "Schoppik" });

// Exercise 3:
const users = { user1: 18273, user2: 92833, user3: 90315 };

const usersArray = Object.entries(users);
console.log(usersArray);

const updateUsersArray = usersArray.map((user) => [user[0], user[1] * 2])
console.log(updateUsersArray);

// Exercise 4:
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person("John");
console.log(typeof member);
// "object"
