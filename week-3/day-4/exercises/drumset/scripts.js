const btn = document.querySelectorAll(".button");
const sounds = {
    "A": "boom-sound",
    "S": "clap-sound",
    "D": "hihat-sound",
    "F": "kick-sound",
    "G": "openhat-sound",
    "H": "ride-sound",
    "J": "snare-sound",
    "K": "tink-sound",
    "L": "tom-sound"
};
btn.forEach(button => {
    button.addEventListener("click", () => {
        const soundClass = sounds[button.innerText];
        const sound = document.querySelector(`.${soundClass}`);
        sound.currentTime = 0;
        sound.play();
    });

    
});

document.addEventListener("keydown", (event) => {
  const button = Array.from(btn).find(b => b.innerText === event.key.toUpperCase());
  if (button) {
    const soundClass = sounds[button.innerText];
    const sound = document.querySelector(`.${soundClass}`);
    sound.currentTime = 0;
    sound.play();
  }
});