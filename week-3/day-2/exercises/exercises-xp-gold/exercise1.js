// Exercise 1:

function is_Blank(str) {
  if (str.trim().length == 0) {
    return true;
  } else {
    return false;
  }
}

console.log(is_Blank("   "));
console.log(is_Blank("abc"));

// Exercise 2:

function abbrevName(name) {
  const names = name.split(" ");
  return names[0] + " " + names[1].charAt(0).toUpperCase() + ".";
}

console.log(abbrevName("John Doe"));

