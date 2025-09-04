let initRoot = document.getElementById("root");

let shoppingList = []

let form = document.createElement("form");
let input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter item";
let button = document.createElement("button");
button.textContent = "Add Item";
form.appendChild(input);
form.appendChild(button);
initRoot.appendChild(form);

let clearAll = document.createElement("button");
clearAll.textContent = "Clear All";
clearAll.addEventListener("click", function () {
    shoppingList = [];
    renderShoppingList();
});
form.appendChild(clearAll);

function addItem(event) {
    event.preventDefault();
    let item = input.value.trim();
    if (item) {
        shoppingList.push(item);
        input.value = "";
        input.focus();
        renderShoppingList();
    }
}
form.addEventListener("submit", addItem);

function renderShoppingList() {
    let list = document.createElement("ul");
    shoppingList.forEach(function (item) {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);

    });
    if (initRoot.childNodes.length > 1) {
        initRoot.removeChild(initRoot.childNodes[1]);
    }
    initRoot.appendChild(list);
}
renderShoppingList();