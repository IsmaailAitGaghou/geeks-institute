let container = document.querySelector("#container")
let animate = document.querySelector("#animate")

function myMove() {
    let pos = 0;
    let id = setInterval(frame, 1);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            animate.style.left = pos + "px";
        }
    }
}
