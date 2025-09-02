let container = document.querySelector("#container")
let clear = document.querySelector("#clear")


// setTimeout(() => {
//   alert("Hello World");
// }, 2000);
function createparaghraph() {
    let p = document.createElement("p");
    p.textContent = "Hello World";

    if (container.children.length > 5) {
        container.removeChild(container.firstChild);
    }
    return container.appendChild(p);
}


setTimeout(() => {
    createparaghraph();
}, 2000);

let intervalId = setInterval(() => {
    createparaghraph();
}, 2000);

clear.addEventListener("click", () => {
    clearInterval(intervalId);
});