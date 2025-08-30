const colors = ["red", "green", "blue", "yellow", "purple"]

for (let i = 0; i < colors.length; i++) {
    console.log("My #" + (i + 1) + " color is " + colors[i])
}

// Bonus
const suffixes = ["st", "nd", "rd", "th", "th"];
for (const color of colors) {
    console.log("My " + (colors.indexOf(color) + 1) + suffixes[colors.indexOf(color)] + " color is " + color)
}