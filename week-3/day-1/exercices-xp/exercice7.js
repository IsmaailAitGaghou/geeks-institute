const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

names.sort();

let firstLetter = "";

for (let i = 0; i < names.length; i++) {
    firstLetter += names[i].charAt(0);
}

console.log(firstLetter);