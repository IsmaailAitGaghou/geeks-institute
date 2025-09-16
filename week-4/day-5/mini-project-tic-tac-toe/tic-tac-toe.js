const restartButton = document.querySelector("#restart");
const messageEl = document.querySelector("#message");
const boardEl = document.querySelector("#game-board");
const chooseX = document.querySelector("#choose-x");
const chooseO = document.querySelector("#choose-o");
const easyBtn = document.querySelector("#ai-easy");
const hardBtn = document.querySelector("#ai-hard");

let board = Array(9).fill(null);
// Ensure currentPlayer is explicitly declared (was previously commented out)
let currentPlayer = "X";
let humanPlayer = "X";
let aiPlayer = "O";
let gameActive = true;
let aiMode = null;
let movesCount = 0;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
  createBoardUI();
  attachUIEvents();
  // Hide restart button until a game has concluded
  if (restartButton) restartButton.style.display = "none";
  updateStatus(`Choose player X or O to begin.`);
}

function createBoardUI() {
  boardEl.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    boardEl.appendChild(cell);
  }
}

function attachUIEvents() {
  boardEl.addEventListener("click", handleCellClick);
  restartButton?.addEventListener("click", resetGame);
  choosePlayer(chooseX);
  choosePlayer(chooseO);
  easyBtn?.addEventListener("click", () => setAiMode("easy"));
  hardBtn?.addEventListener("click", () => setAiMode("hard"));
}

function choosePlayer(btn) {
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (movesCount > 0) return;
    humanPlayer = btn.textContent.trim();
    aiPlayer = humanPlayer === "X" ? "O" : "X";
    currentPlayer = "X";
    updateStatus(`You are ${humanPlayer}. ${currentPlayer}'s turn.`);
    maybeAIMove();
  });
}

function setAiMode(mode) {
  if (movesCount > 0) return;
  aiMode = mode;
  updateStatus(`Mode: ${mode.toUpperCase()} selected. Choose X or O.`);
}

function handleCellClick(e) {
  if (!gameActive) return;
  const cell = e.target.closest(".cell");
  if (!cell) return;
  const idx = parseInt(cell.dataset.index, 10);
  if (board[idx]) return;
  if (aiMode && currentPlayer !== humanPlayer) return;

  playMove(idx, currentPlayer);
  if (!gameActive) return;
  switchPlayer();
  maybeAIMove();
}

function playMove(index, player) {
  board[index] = player;
  movesCount++;
  renderBoard();
  const winLine = checkWin(player);
  if (winLine) {
    highlightWin(winLine);
    endGame(`${player} wins!`);
    return;
  }
  if (checkDraw()) {
    endGame(`It's a draw.`);
  } else {
    updateStatus(`Player ${currentPlayer === "X" ? "O" : "X"}'s turn`);
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin(player) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return line;
    }
  }
  return null;
}

function checkDraw() {
  return movesCount === 9 && gameActive;
}

function endGame(msg) {
  gameActive = false;
  updateStatus(msg + " Click restart to play again.");
  if (restartButton) restartButton.style.display = "inline-block";
}

function highlightWin(line) {
  line.forEach((i) => {
    const cell = boardEl.querySelector(`.cell[data-index="${i}"]`);
    if (cell) cell.classList.add("win");
  });
}

function renderBoard() {
  board.forEach((val, i) => {
    const cell = boardEl.querySelector(`.cell[data-index="${i}"]`);
    if (cell) cell.textContent = val || "";
  });
}

function updateStatus(text) {
  if (messageEl) messageEl.textContent = text;
}

function resetGame() {
  board = Array(9).fill(null);
  gameActive = true;
  movesCount = 0;
  currentPlayer = "X";
  boardEl.querySelectorAll(".cell").forEach((c) => {
    c.textContent = "";
    c.classList.remove("win");
  });
  // Hide restart until next game ends
  if (restartButton) restartButton.style.display = "none";
  updateStatus(`Game reset. Choose player or start playing.`);
}

function maybeAIMove() {
  if (!aiMode) return;
  if (!gameActive) return;
  if (currentPlayer !== aiPlayer) return;

  setTimeout(() => {
    const move =
      aiMode === "easy" ? pickRandomMove() : pickBestMoveMinimax(aiPlayer);
    if (move != null) {
      playMove(move, aiPlayer);
      if (gameActive) switchPlayer();
    }
  }, 300);
}

function availableMoves() {
  return board.map((v, i) => (v ? null : i)).filter((v) => v !== null);
}

function pickRandomMove() {
  const moves = availableMoves();
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

function pickBestMoveMinimax(player) {
  let bestScore = -Infinity;
  let bestMove = null;
  for (const move of availableMoves()) {
    board[move] = player;
    const score = minimax(false, player);
    board[move] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(isMaximizing, aiSymbol) {
  const humanSymbol = aiSymbol === "X" ? "O" : "X";
  if (checkWin(aiSymbol)) return 10;
  if (checkWin(humanSymbol)) return -10;
  if (availableMoves().length === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of availableMoves()) {
      board[move] = aiSymbol;
      const val = minimax(false, aiSymbol);
      board[move] = null;
      best = Math.max(best, val);
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of availableMoves()) {
      board[move] = humanSymbol;
      const val = minimax(true, aiSymbol);
      board[move] = null;
      best = Math.min(best, val);
    }
    return best;
  }
}
