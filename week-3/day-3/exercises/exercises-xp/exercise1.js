let h1 = document.querySelector("h1");
console.log(h1);

let article = document.querySelector("article");
article.lastElementChild.remove();

let h2 = document.querySelector("h2");

h2.addEventListener("click", () => {
  h2.style.background = "red";
});

let h3 = document.querySelector("h3");
h3.addEventListener("click", () => {
  h3.style.display = "none";
});

let button = document.createElement("button");

// console.log(p);

button.textContent = "Click me";
article.append(button);

button.addEventListener("click", () => {
  let parag = document.querySelectorAll("p");
  parag.forEach((p) => {
    p.style.fontWeight = "bold";
  });
});

let randomnumber = Math.floor(Math.random() * 100);
h1.addEventListener("mouseover", () => {
  h1.style.fontSize = `${randomnumber}px `;
});
