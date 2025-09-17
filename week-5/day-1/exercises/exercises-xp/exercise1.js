// Exercise 1 : Comparison
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num > 10) {
      resolve(`${num} is greater than 10, success!`);
    } else {
      reject(`${num} is less than 10, error!`);
    }
  });
}

compareToTen(15)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
compareToTen(8)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// Exercise 2 : Promises

function returnpromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 4000);
  });
}

returnpromise().then(console.log);

// Exercise 3: Resolve & Reject

const resolved = Promise.resolve(3);
const rejected = Promise.reject("Boo");

resolved.then((value) => console.log(value));
rejected.catch((error) => console.log(error));
