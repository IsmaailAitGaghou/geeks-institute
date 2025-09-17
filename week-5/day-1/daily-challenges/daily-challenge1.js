// first challenge
function makeAllCaps(array) {
  return new Promise((resolve, rejecte) => {
    if (array.every((word) => typeof word)) {
      resolve(array.map((word) => word.toUpperCase()));
    } else {
      rejecte("all elements in the array should be a string");
    }
  });
}

function sortWords(array) {
  return new Promise((resolve, rejecte) => {
    if (array.length > 4) {
      resolve(array.sort());
    } else {
      rejecte("the array should be more than 4 items");
    }
  });
}

makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log("ssssss" + error));

makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result)) //["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
  .catch((error) => console.log(error));

// second challenge
const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
    let morseobj = JSON.parse(morse);

    return new Promise((resolve, rejecte) => {
        if(Object.keys(morseobj).length === 0) {
            rejecte("empty")
        } else {
            resolve(morseobj)
        }

    })
}

function toMorse(morseJS) {
    
    return new Promise((resolve, rejecte) => {
        let word = prompt("enter a word to translate to morse code")
        let translation = [];
        word = word.toLowerCase()
        for (char in word) {
          if (morseJS[char]) {
            translation.push(morseJS[char]);
          } else {
            rejecte("character doen't exist in morse code");
          }
        }
        resolve(translation);
    })
}

function joinWords(morsetranslation) {
    let resolvedtranslation = morsetranslation.join("\n")
    console.log(resolvedtranslation)
}

toJs()
  .then(toMorse)
  .then(joinWords)
  .catch((error) => console.log(error));