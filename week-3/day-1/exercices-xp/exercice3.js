// Exercice 3:
let userInput = prompt("Enter a number:");

console.log(typeof userInput);

while (userInput < 10) {
    userInput = prompt("Enter a number greater than or equal to 10:");
}


// exercice 4:

const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

console.log(building.numberOfFloors);
console.log(`${building.numberOfAptByFloor.firstFloor} ${building.numberOfAptByFloor.thirdFloor}`);
console.log(`${building.nameOfTenants[1]} ${building.numberOfRoomsAndRent.dan[0]}`);

let sarah_rent = building.numberOfRoomsAndRent.sarah[1];
let david_rent = building.numberOfRoomsAndRent.david[1];
let dan_rent = building.numberOfRoomsAndRent.dan[1];
const check =
  sarah_rent + david_rent > dan_rent
    ? (dan_rent = 1200)
    : dan_rent;
    
