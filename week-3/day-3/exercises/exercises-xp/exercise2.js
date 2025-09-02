let form = document.querySelector("form");

console.log(form);

// Retrieve the inputs by their id and console.log them.

let input1 = document.querySelector("#fname");
let input2 = document.querySelector("#lname");

console.log(input1);
console.log(input2);

// Retrieve the inputs by their name attribute and console.log them.

let inputByName1 = document.querySelector("input[name='firstname']");
let inputByName2 = document.querySelector("input[name='lastname']");

console.log(inputByName1);
console.log(inputByName2);

// When the user submits the form (ie. submit event listener)

let submit = document.querySelector("#submit");

form.addEventListener("submit", (e) => {
  // to prevent the default behavior of the submition
  e.preventDefault();
  let fname = inputByName1.value.trim();
  let lname = inputByName2.value.trim();
  
  if (fname == "" || lname == "") {
    alert("Enter a valid name")
  }

  const firstNameLi = document.createElement("li");
  firstNameLi.textContent = fname;

  const lastNameLi = document.createElement("li");
  lastNameLi.textContent = lname;

  const userList = document.querySelector(".usersAnswer");
  userList.appendChild(firstNameLi);
  userList.appendChild(lastNameLi);
});

