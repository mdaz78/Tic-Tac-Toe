let human, computer;
let origBoard;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];
const cells = document.querySelectorAll('.cell');

let chooseXorO = () => {
  human = document.querySelector('input[name="x_o"]:checked').value;
  computer = human === 'X' ? 'O' : 'X';
  document.getElementById('choice').style.display = 'none';
  document.getElementById('board').style.display = 'block';
  document.getElementById('replay').style.display = 'block';
  startGame();
}

document.getElementById('play-button').addEventListener('click', chooseXorO);

function startGame() {
  document.querySelector(".endgame").style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick);
  }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] == 'number') {
    turn(square.target.id, human);
    if (!checkTie()) {
      console.log("Inside checkTie");
      turn(bestSpot(), computer);
    }
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = gameWon.player == human ? "green" : "red";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick);
  }
  declareWinner(gameWon.player == human ? "you won!" : "you lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
  return emptySquares()[0];
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'green';
      cells[i].removeEventListener('click', turnClick)
    }
    declareWinner('Tie Game');
    return true;
  }
  return false;
}