let div = document.getElementById("container");
console.log(div);
let userList = document.querySelectorAll(".list");

userList[0].children[1].textContent = "Richard";
userList[1].children[1].remove();

for (let i = 0; i < userList.length; i++) {
    userList[i].children[0].textContent = "Ismaail";
}

for (let i = 0; i < userList.length; i++) {
    userList[i].classList.add("student_list");
}

userList[0].classList.add("university", "attendance");

container.style.backgroundColor = "lightblue";
container.style.padding = "10px";