var chalk       = require('chalk');
var clear       = require('clear');
var figlet      = require('figlet');
var inquirer    = require('inquirer');

const printBoard = (board) => {
  clear();
  console.log(chalk.yellow(figlet.textSync('Tic Tac Toe', { horizontalLayout: 'full' })));
  console.log(chalk.blue(`${board[0]}|${board[1]}|${board[2]}\n- - -
${board[3]}|${board[4]}|${board[5]}\n- - -
${board[6]}|${board[7]}|${board[8]}\n`));
}

const getChoices = board =>
  board.reduce((acc, t, idx) => {
    if (board[idx] === ' ') acc.push((idx + 1).toString());
    return acc;
  }, []);

const checkWin = (board, player) =>
  winningCombos.reduce((acc, c) =>
    acc ||
    board[c[0]] === player &&
    board[c[1]] === player &&
    board[c[2]] === player
  , false);

const checkTie = board =>
  board.reduce((acc, t) =>
    t === ' ' ? acc : acc + 1
  , 0) === 9;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const analizeBoard = (board, player, move) => {
  board[parseInt(move) - 1] = player;
  if(checkWin(board, player)) {
    printBoard(board);
    console.log(chalk.red(`Player ${player} just won!`));
  } else if (checkTie(board)) {
    printBoard(board);
    console.log(chalk.red('It is a tie!'));
  } else {
    player = player === 'O' ? 'X' : 'O';
    ticTacToe(board, player);
  }
}

const ticTacToe = (board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player = 'O') => {
  inquirer.prompt({
    type: 'list',
    name: 'move',
    message: `Player ${player}... What is your move?\n1|2|3\n4|5|6\n7|8|9`,
    choices: getChoices(board)
  })
  .then(move => analizeBoard(board, player, move.move));
}

ticTacToe();
