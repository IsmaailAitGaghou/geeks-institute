let allBoldItems ;

function getBoldItems() {
    let paraghraph = document.querySelector("p")

    allBoldItems = paraghraph.querySelectorAll("strong")
    console.log(allBoldItems);  
}

function highlight() {
    allBoldItems.forEach(element => {
        element.style.color = "blue"
    });
}

function returnItemsToDefault() {
    allBoldItems.forEach((element) => {
        element.style.color = "black"
    })
}
getBoldItems();
let paraghraph = document.querySelector("p");

paraghraph.addEventListener("mouseover", () => highlight())
paraghraph.addEventListener("mouseout", () => returnItemsToDefault())