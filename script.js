// script.js
const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winnerText = document.getElementById('winner');

const playerDisplay = document.getElementById('currentPlayer'); // Get the span for X/O

let currentPlayer = 'X';
const boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]  // Diagonals
];

function updateDisplay() {
  playerDisplay.textContent = currentPlayer;
}

function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] !== null) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (boardState.every(cell => cell !== null)) {
    endGame(true);
  } else {
    swapTurns();
    updateDisplay(); // Update display after each turn
  }
}

function swapTurns() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameBoard.classList.toggle('x-turn');
  gameBoard.classList.toggle('o-turn');
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === player;
    });
  });
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = "It's a Draw!";
  } else {
    winnerText.textContent = `${currentPlayer} Wins!`;
  }
  winningMessageElement.classList.remove('hidden');
}

function restartGame() {
  currentPlayer = 'X';
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  winningMessageElement.classList.add('hidden');
  updateDisplay(); // Update display after restart
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

// Call updateDisplay initially to set the starting player
updateDisplay();