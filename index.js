var chalk       = require('chalk');
var clear       = require('clear');
var figlet      = require('figlet');
var inquirer    = require('inquirer');

const printBoard = function(board) {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('Tic Tae Toe', { horizontalLayout: 'full' })
    )
  );
  let result = `${board[0]}|${board[1]}|${board[2]}`;
  result += '\n- - -\n';
  result += `${board[3]}|${board[4]}|${board[5]}`;
  result += '\n- - -\n';
  result += `${board[6]}|${board[7]}|${board[8]}`;
  console.log(
    chalk.blue(
      result
    )
  );
}

const getChoices = function(board) {
  let counter = 0;
  let results = [];
  board.forEach((row, y) => {
    if (board[y] === ' ') results.push((counter + 1).toString());
    counter++;
  });
  return results;
}

const checkWin = function(board, player) {
  let won = false;
  winningCombos.forEach(c => {
    if (
      board[c[0]] === player &&
      board[c[1]] === player &&
      board[c[2]] === player
    ) {
      won = true;
    }
  });
  return won;
}

const checkTie = function(board) {
  let counter = 0;
  board.forEach(c => {
    if (c !== ' ') counter++;
  });
  return counter === 9;
}

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const tictaetoe = function(board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player = 'O') {
  let choices = getChoices(board);
  printBoard(board);
  inquirer
  .prompt({
    type: 'list',
    name: 'move',
    message: `Player ${player}, what is your move?\n1|2|3\n4|5|6\n7|8|9`,
    choices: choices
  })
  .then(res => {
    board[parseInt(res.move) - 1] = player;
    if(checkWin(board, player)) {
      printBoard(board);
      console.log(
        chalk.red(`Player ${player} just won!`)
      );
    } else if (checkTie(board)) {
      printBoard(board);
      console.log(
        chalk.red('It is a tie!')
      );
    } else {
      player = player === 'O' ? 'X' : 'O';
      tictaetoe(board, player);
    }
  })
}

tictaetoe();
