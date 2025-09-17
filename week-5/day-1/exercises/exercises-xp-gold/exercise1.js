// Exercise 1: Promise.all()

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "foo");
});

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log(values)
    })
    .catch(error => {
        console.log(error);
        
    })
// Promise.all() takes an array of promises (or values) and returns a new promise.
// This returned promise resolves when all input promises are resolved, producing an array of their resolved values in the same order.
// If any input promise is rejected, Promise.all() will reject immediately with that error.

// Exercise 2:

function timesTwoAsync(x) {
  return new Promise((resolve) => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr).then((result) => {
  console.log(result);
});
// the output: [2, 4, 6]