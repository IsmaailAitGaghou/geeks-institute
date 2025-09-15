const isAnagramArrow = (str1, str2) => {
  const format = (str) =>
    str.replace(/\s+/g, "").toLowerCase().split("").sort().join("");
  return format(str1) === format(str2) ? true : false;
}
console.log(isAnagramArrow("Astronomer", "Moon starer"));