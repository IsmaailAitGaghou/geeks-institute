// Exercise 1: Giphy API
const getHilariousgifs = async () => {
    try {
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const joke = await response.json();
        console.log(joke);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

getHilariousgifs();

// Exercise 2: Giphy API
const getSungifs = async () => {
    try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?q=sun&rating=g&limit=10&offset=2&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const joke = await response.json();
        console.log(joke);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

getSungifs();

// Exercise 3: Async function

fetch("https://www.swapi.tech/api/starships/9/")
  .then((response) => response.json())
  .then((objectStarWars) => console.log(objectStarWars.result));


const getStarships = async () => {
    let response = await fetch("https://www.swapi.tech/api/starships/9/");
    let data = await response.json();
    if (!response.ok) throw new Error("Network response was not ok");
    console.log(data.result);
}

getStarships();

// Exercise 4: Analyze
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  let result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();
// 1. The function `resolveAfter2Seconds` returns a promise that resolves with the string "resolved" after a delay of 2 seconds.
// 2. The `asyncCall` function is declared as an asynchronous function using the `async` keyword.
// 3. Inside `asyncCall`, it first logs "calling" to the console.
// 4. It then uses the `await` keyword to pause execution until the promise returned by `resolveAfter2Seconds` is resolved.
// 5. After the promise resolves (after 2 seconds), it assigns the resolved value ("resolved") to the variable `result`.
// 6. Finally, it logs the value of `result` to the console, which will be "resolved".

// the output will be:
// calling
// resolved