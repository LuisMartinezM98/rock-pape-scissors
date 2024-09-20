const HMACGenerator = require('./HMACGenerator');
const MoveRules = require('./MoveRules');
const HelpTable = require('./HelpTable');
const readline = require('readline');
const crypto = require('crypto'); // Use for generating link to HMAC verification

class Game {
  constructor(moves) {
    if (!moves || moves.length < 3 || moves.length % 2 === 0) {
      throw new Error('You must provide an odd number of at least 3 unique moves.');
    }

    this.moves = moves;
    this.moveRules = new MoveRules(moves);

    // Generate the key and the computer's move but only reveal the HMAC
    this.key = HMACGenerator.generateKey();
    this.computerMove = this.getRandomMove();
    this.hmac = HMACGenerator.generateHMAC(this.key, this.computerMove);
  }

  getRandomMove() {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[randomIndex];
  }

  displayMenu() {
    console.log(`HMAC: ${this.hmac}`);
    console.log('Available moves:');
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - Exit');
    console.log('? - Help');
  }

  play() {
    this.displayMenu();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter your move: ', (answer) => {
      if (answer === '?') {
        this.displayHelp();
      } else if (answer === '0') {
        console.log('Goodbye!');
        rl.close();
        return;
      } else {
        const userMoveIndex = parseInt(answer) - 1;
        if (isNaN(userMoveIndex) || userMoveIndex < 0 || userMoveIndex >= this.moves.length) {
          console.log('Invalid move! Please try again.');
          this.play(); // Recurse to ask again
        } else {
          const userMove = this.moves[userMoveIndex];
          this.showResults(userMove);
        }
      }
      rl.close();
    });
  }

  showResults(userMove) {
    console.log(`Your move: ${userMove}`);
    console.log(`Computer's move: ${this.computerMove}`);
    console.log(`HMAC key: ${this.key}`);

    const result = this.moveRules.determineWinner(userMove, this.computerMove);
    console.log(result);
  }

  displayHelp() {
    const helpTable = new HelpTable(this.moves);
    helpTable.displayTable();
    this.play(); // Return to menu after showing help
  }
}

module.exports = Game;
