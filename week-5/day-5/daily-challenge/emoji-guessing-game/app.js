const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");


const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const emojis = [
  { emoji: "🐶", name: "Dog" },
  { emoji: "😂", name: "Laugh" },
  { emoji: "🏀", name: "Basketball" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🚗", name: "Car" },
  { emoji: "😀", name: "Smile" },
  { emoji: "😍", name: "HeartEyes" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🤔", name: "Thinking" },
  { emoji: "🎉", name: "Party" },
  { emoji: "🌟", name: "Star" },
];

const leaderboard = [];

app.get("/api/emoji", (req, res) => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const correctEmoji = emojis[randomIndex];

  const options = [correctEmoji.name];

  while (options.length < 4) {
    const randomOption = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  const shuffledOptions = options.sort(() => Math.random() - 0.5);

  res.json({
    emoji: correctEmoji.emoji,
    correctAnswer: correctEmoji.name,
    options: shuffledOptions,
  });
});

app.post("/api/guess", (req, res) => {
  const { playerName, guess, correctAnswer } = req.body;

  const isCorrect = guess === correctAnswer;

  
  if (playerName) {
    const existingPlayer = leaderboard.find(
      (player) => player.name === playerName
    );

    if (existingPlayer) {
      if (isCorrect) existingPlayer.score += 1;
    } else {
      leaderboard.push({
        name: playerName,
        score: isCorrect ? 1 : 0,
      });
    }
  }

  res.json({
    isCorrect,
    message: isCorrect
      ? "Correct!"
      : "Wrong! The correct answer is " + correctAnswer,
  });
});

app.get("/api/leaderboard", (req, res) => {
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);
  res.json(sortedLeaderboard);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
