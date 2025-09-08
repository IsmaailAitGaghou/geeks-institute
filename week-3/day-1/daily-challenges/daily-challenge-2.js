let stars = "";
for (let i = 0; i < 6; i++) {
    stars += "* ";
    console.log(stars);
}

for (let i = 0; i < 6; i++) {
    let stars2 = "";
    for (let j = 0; j <= i; j++) {
        stars2 += "* ";
    }
    console.log(stars2);
}
