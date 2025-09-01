const allBooks = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51sVQGEP9EL._SY344_BO1,204,203,200_.jpg", 
    alreadyRead: true
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41aMfj0i1YL._SX329_BO1,204,203,200_.jpg",
    alreadyRead: false
  },
];


const listBooksSection = document.querySelector(".listBooks");
allBooks.forEach(book => {
  const bookDiv = document.createElement("div")
  const titleAuthorPara = document.createElement("p");
  titleAuthorPara.textContent = `${book.title} written by ${book.author}`;

  if (book.alreadyRead) {
    titleAuthorPara.style.color = "red";
  }

  const bookImage = document.createElement("img");
  bookImage.src = book.image;
  bookImage.alt = book.title;
  bookImage.style.width = "100px";

  bookDiv.appendChild(bookImage);
  bookDiv.appendChild(titleAuthorPara);

  listBooksSection.appendChild(bookDiv);
});