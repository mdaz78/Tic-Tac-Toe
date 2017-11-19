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
  [6, 4, 2 ]
];
const cells = document.querySelectorAll('.cell');

let chooseXorO = () => {
  human = document.querySelector('input[name="x_o"]:checked').value;
  computer = human === 'X' ? 'O' : 'X';
  document.getElementById('choice').style.display = 'none';
  document.getElementById('board').style.display = 'block';
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
  turn(square.target.id, human)
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}