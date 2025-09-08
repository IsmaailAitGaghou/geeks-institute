let nav = document.querySelector("#navbar");

(function(name) {
    let avatar = document.createElement("img");
    avatar.src = `https://cdn-icons-png.flaticon.com/512/0/93.png`;
    avatar.alt = name;
    avatar.style.width = "40px";
    avatar.style.height = "40px";
    nav.append(avatar);
    nav.append(document.createTextNode(name));
})("ISMAIL");