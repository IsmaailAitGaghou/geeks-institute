let selectElement = document.querySelector("#genres");

let selectedOption = selectElement.options[selectElement.selectedIndex];
console.log("Selected genre:", selectedOption.value);

let option1 = document.createElement("option");
option1.value = "classic";
option1.textContent = "Classical";
selectElement.appendChild(option1);

selectedOption.removeAttribute("selected");
option1.setAttribute("selected" , "");

console.log("Newly selected genre:", selectElement.value);