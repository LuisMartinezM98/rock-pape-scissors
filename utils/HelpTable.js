const Table = require('cli-table3');

class HelpTable {
  constructor(moves) {
    this.moves = moves;
  }

  displayTable() {
    const N = this.moves.length;
    const table = new Table({
      head: ['Move', ...this.moves]
    });

    for (let i = 0; i < N; i++) {
      const row = [this.moves[i]];
      for (let j = 0; j < N; j++) {
        if (i === j) {
          row.push('Draw');
        } else {
          const result = this._getMoveResult(i, j, N);
          row.push(result);
        }
      }
      table.push(row);
    }
    console.log(table.toString());
  }

  _getMoveResult(i, j, N) {
    const half = Math.floor(N / 2);
    const distance = (j - i + N) % N;
    return distance <= half ? 'Win' : 'Lose';
  }
}

module.exports = HelpTable;
