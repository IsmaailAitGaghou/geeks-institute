// Exercise 1 : Giphy API #2
const getHilariousGifs = async () => {
    try {
        const response = await fetch("https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My");
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const data = await response.json();
        const randomnumber = Math.floor(Math.random() * data.data.length);
        const gif = data.data[randomnumber].images.original.url;
        const image = document.createElement("img");
        image.src = gif;
        document.body.appendChild(image);
    }
    catch(error){
        console.error("Error fetching data from Giphy API:", error);
    }
}
getHilariousGifs();

// Exercise 2 : Analyze #2
let resolveAfter2Seconds = function () {
  console.log("starting slow promise");
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
};

let resolveAfter1Second = function () {
  console.log("starting fast promise");
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
};

let sequentialStart = async function () {
  console.log("==SEQUENTIAL START==");
  const slow = await resolveAfter2Seconds();
  console.log(slow);
  const fast = await resolveAfter1Second();
  console.log(fast);
};

sequentialStart();

// the output will be:
// ==SEQUENTIAL START==
// starting slow promise
// slow promise is done
// slow
// starting fast promise
// fast promise is done
// fast

// Exercise 3 : Analyze #2

// let resolveAfter2Seconds = function () {
// console.log("starting slow promise");
//   return new Promise((resolve) => {
//     setTimeout(function () {
//       resolve("slow");
//       console.log("slow promise is done");
//     }, 2000);
//   });
// };

// let resolveAfter1Second = function () {
//   console.log("starting fast promise");
//   return new Promise((resolve) => {
//     setTimeout(function () {
//       resolve("fast");
//       console.log("fast promise is done");
//     }, 1000);
//   });
// };

// let concurrentStart = async function () {
//   console.log("==CONCURRENT START with await==");
//   const slow = resolveAfter2Seconds();
//   const fast = resolveAfter1Second();
//   console.log(await slow);
//   console.log(await fast);
// };

// setTimeout(concurrentStart, 4000);

// the output will be:
// ==CONCURRENT START with await==
// starting slow promise
// starting fast promise
// fast promise is done
// fast
// slow promise is done
// slow

// Exercise 4 : Modify fetch

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
    try {
        const [users, posts, albums] = await Promise.all(
            urls.map( async (url) => {
                const response = await fetch(url);
                if(!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
        );
        console.log("users", users);
        console.log("posts", posts);
        console.log("albums", albums);
    } catch (error) {
        console.error("ooooops:", error);
    }
};

getData();

