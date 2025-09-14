function allTruthy(...arr) {
    return arr.every(Boolean);
}

console.log(allTruthy(5, 4, 3, 2, 1, 0));
console.log(allTruthy(true, false, true));