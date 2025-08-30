const people = ["Greg", "Mary", "Devon", "James"]

people.shift()
people[2] = "Jason"
people.push("Ismaail")
console.log(people.indexOf("Mary"))
const newPeople = people.slice(1, 3)
console.log(newPeople)
console.log(people.indexOf("Foo")) // will return -1 because "Foo" is not in the array
const last = people[people.length - 1]
console.log(last)

// part 2:
// 1)
// 1. Using a for loop
for (let i = 0; i < people.length; i++) {
  console.log(people[i])
}
// 2. Using a for..of loop
for (const person of people) {
  console.log(person)
}

// 2)
for (const person of people) {
    if (person === "Devon") {
        break
    }
  console.log(person)
}