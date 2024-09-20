const Game = require('./utils/Game')


const args = process.argv.slice(2);
if (args.length < 3 || args.length % 2 === 0) {
  console.error('Error: You must provide an odd number of at least 3 unique moves.');
  console.error('Example: node index.js Rock Paper Scissors');
  process.exit(1);
}

const game = new Game(args);
game.play();