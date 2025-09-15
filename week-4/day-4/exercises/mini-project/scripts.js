const quoteList = [
    {
        quoteId: 0,
        quoteAuthor: "L. Harper",
        quoteText:
            "Courage is taking the next small step even when you can't see the whole staircase.",
        quoteLikes: 0,
    },
    {
        quoteId: 1,
        quoteAuthor: "A. Rivers",
        quoteText: "Curiosity turns questions into knowledge.",
        quoteLikes: 0,
    },
    {
        quoteId: 2,
        quoteAuthor: "N. Patel",
        quoteText: "Simplicity is the art of maximizing what matters.",
        quoteLikes: 0,
    },
    {
        quoteId: 3,
        quoteAuthor: "Teamwork Collective",
        quoteText: "Collaboration multiplies what one person can do alone.",
        quoteLikes: 0,
    },
    {
        quoteId: 4,
        quoteAuthor: "J. Lin",
        quoteText: "Mistakes are feedback; use them to iterate faster.",
        quoteLikes: 0,
    },
];


let previousQuoteIndex = -1;
let activeQuote = null;
let authorFilteredQuotes = [];
let authorFilteredIndex = 0;


const quoteSection = document.getElementById("quoteSection");
const btnGenerate = document.getElementById("generateBtn");
const btnCharsSpace = document.getElementById("countCharsSpace");
const btnCharsNoSpace = document.getElementById("countCharsNoSpace");
const btnWordCount = document.getElementById("countWords");
const btnLike = document.getElementById("likeBtn");
const btnAddQuote = document.getElementById("addQuoteBtn");
const btnFilter = document.getElementById("filterBtn");
const btnPrev = document.getElementById("prevBtn");
const btnNext = document.getElementById("nextBtn");


function renderQuote(quoteObj) {
  activeQuote = quoteObj;
  quoteSection.innerHTML = `
    <p>"${quoteObj.quoteText}"</p>
    <p>- ${quoteObj.quoteAuthor}</p>
    <p>❤️ Likes: ${quoteObj.quoteLikes}</p>
  `;
}

function getRandomQuoteIdx() {
  let idx;
  do {
    idx = Math.floor(Math.random() * quoteList.length);
  } while (idx === previousQuoteIndex && quoteList.length > 1);
  previousQuoteIndex = idx;
  return idx;
}

function showMessage(msg) {
  window.alert(msg);
}


function onGenerateQuote() {
  const idx = getRandomQuoteIdx();
  renderQuote(quoteList[idx]);
}

function onCharsSpace() {
  if (activeQuote) {
    showMessage(`Characters (with spaces): ${activeQuote.quoteText.length}`);
  }
}

function onCharsNoSpace() {
  if (activeQuote) {
    showMessage(
      `Characters (no spaces): ${
        activeQuote.quoteText.replace(/\s+/g, "").length
      }`
    );
  }
}

function onWordCount() {
  if (activeQuote) {
    showMessage(`Words: ${activeQuote.quoteText.trim().split(/\s+/).length}`);
  }
}

function onLikeQuote() {
  if (activeQuote) {
    activeQuote.quoteLikes++;
    renderQuote(activeQuote);
  }
}

function onAddQuote() {
  const inputQuote = document.getElementById("newQuote").value.trim();
  const inputAuthor = document.getElementById("newAuthor").value.trim();
  if (inputQuote && inputAuthor) {
    quoteList.push({
      quoteId: quoteList.length,
      quoteAuthor: inputAuthor,
      quoteText: inputQuote,
      quoteLikes: 0,
    });
    showMessage("New quote added!");
    document.getElementById("newQuote").value = "";
    document.getElementById("newAuthor").value = "";
  }
}

function onFilterQuotes() {
  const authorInput = document
    .getElementById("filterAuthor")
    .value.trim()
    .toLowerCase();
  authorFilteredQuotes = quoteList.filter(
    (q) => q.quoteAuthor.toLowerCase() === authorInput
  );
  authorFilteredIndex = 0;
  if (authorFilteredQuotes.length > 0) {
    renderQuote(authorFilteredQuotes[authorFilteredIndex]);
  } else {
    quoteSection.innerHTML = "No quotes found for this author.";
  }
}

function onPrevQuote() {
  if (authorFilteredQuotes.length > 0) {
    authorFilteredIndex =
      (authorFilteredIndex - 1 + authorFilteredQuotes.length) %
      authorFilteredQuotes.length;
    renderQuote(authorFilteredQuotes[authorFilteredIndex]);
  }
}

function onNextQuote() {
  if (authorFilteredQuotes.length > 0) {
    authorFilteredIndex =
      (authorFilteredIndex + 1) % authorFilteredQuotes.length;
    renderQuote(authorFilteredQuotes[authorFilteredIndex]);
  }
}


btnGenerate.addEventListener("click", onGenerateQuote);
btnCharsSpace.addEventListener("click", onCharsSpace);
btnCharsNoSpace.addEventListener("click", onCharsNoSpace);
btnWordCount.addEventListener("click", onWordCount);
btnLike.addEventListener("click", onLikeQuote);
btnAddQuote.addEventListener("click", onAddQuote);
btnFilter.addEventListener("click", (event) => {
  event.preventDefault();
  onFilterQuotes();
});
btnPrev.addEventListener("click", onPrevQuote);
btnNext.addEventListener("click", onNextQuote);
