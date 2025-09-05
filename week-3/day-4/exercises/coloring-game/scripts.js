let clear = document.querySelector("#clear");
let palettes = document.querySelector("#palette");
let main = document.querySelector("#main");

let colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "black",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "navy",
  "maroon",
  "olive",
  "coral",
  "gold",
  "silver",
  "indigo"
];

let currentColor = null;
let isDrawing = false;

function createPalette() {
  colors.forEach((color) => {
    let colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorDiv.className = `color ${color}`;
    palettes.appendChild(colorDiv);
  });
}

palettes.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    currentColor = e.target.style.backgroundColor;
    console.log(currentColor);
  }
});

let grid = 30;
function createGrid() {
  main.innerHTML = "";

  for (let i = 0; i < grid * grid; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    main.appendChild(cell);
  }
}

main.addEventListener("mousedown", (e) => {
    if(!e.target.classList.contains("cell")) return;
    isDrawing = true;
    e.target.style.backgroundColor = currentColor;
});

main.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("cell")) {
    e.target.style.backgroundColor = currentColor;
  }
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

clear.addEventListener("click", () => {
  createGrid();
});

createPalette();
createGrid();
