class MoveRules {
  constructor(moves) {
    this.moves = moves;
  }

  // Método para determinar el ganador
  determineWinner(userMove, computerMove) {
    const n = this.moves.length;
    const p = Math.floor(n / 2); // La mitad del número de movimientos

    const userIndex = this.moves.indexOf(userMove);
    const computerIndex = this.moves.indexOf(computerMove);

    const result = Math.sign((userIndex - computerIndex + n) % n - p);
    if (result === 0) return 'It\'s a tie!';
    return result > 0 ? 'You win!' : 'Computer wins!';
  }
}

module.exports = MoveRules;
