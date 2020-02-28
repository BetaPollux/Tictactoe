var game = {
    score: { x: 0, o: 0 },
    rows: 3,
    cols: 3,
    cells: [],
    player: 'o',
    lock: false,
    checkRow: function(n) {
        var n0 = this.cols * n;
        return this.cells[n0] != '-' && this.cells[n0] === this.cells[n0 + 1] && this.cells[n0 + 1] === this.cells[n0 + 2];
    },
    checkCol: function(n) {
        var n0 = this.rows * n;
        return this.cells[n0] != '-' && this.cells[n0] === this.cells[n0 + this.rows] && this.cells[n0 + this.rows] === this.cells[n0 + 2 * this.rows];
    },
    winner: function() {
        if (this.checkRow(0)) {
            return this.cells[0];
        } else if (this.checkRow(1)) {
            return this.cells[3];
        } else if (this.checkRow(2)) {
            return this.cells[6];
        } else if (this.checkCol(0)) {
            return this.cells[0];
        } else if (this.checkCol(1)) {
            return this.cells[1];
        } else if (this.checkCol(2)) {
            return this.cells[2];
        } else if (this.cells[0] != '-' && this.cells[0] === this.cells[4] && this.cells[4] === this.cells[8]) {
            return this.cells[0];
        } else if (this.cells[2] != '-' && this.cells[2] === this.cells[4] && this.cells[4] === this.cells[6]) {
            return this.cells[2];
        } else {
            return '-';
        }
    },
    cellClicked: function(row, col) {
        var index = (this.cols) * row + col;
        this.cells[index] = this.player;
        console.log(this.cells);

        this.swapPlayer();
    },
    swapPlayer: function() {
        if (this.player === 'o') {
            this.player = 'x';
        } else {
            this.player = 'o';
        }
    },
    clear: function() {
        var numCells = this.rows * this.cols;
        for (var i = 0; i < numCells; i++) {
            this.cells[i] = '-';
        }
        this.player = 'o';
        console.log('cleared');
    }
};

function refreshNextTurn() {
    var nextTurn = document.getElementById('next-turn');
    nextTurn.textContent = game.player.toUpperCase();
}

function updateScore() {
    var score_o = document.getElementById('score-o');
    var score_x = document.getElementById('score-x');

    score_o.textContent = game.score['o'];
    score_x.textContent = game.score['x'];
}

//Initialize all game cells
(function() {
    game.clear();

    var cells = document.getElementsByClassName('game-cell');
    if (cells.length > 1) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].onclick = function() {
                if (!game.lock) {
                    var row = parseInt(this.getAttribute('row'));
                    var col = parseInt(this.getAttribute('col'));
                    var marked = this.getAttribute('marked');
                    if (!marked || marked === '-') {
                        this.setAttribute('marked', game.player);
                        game.cellClicked(row, col);
                        var winner = game.winner();
                        if (winner != '-') {
                            alert('Player ' + winner + ' wins!');
                            game.score[winner]++;
                            game.lock = true;
                            updateScore();
                        } else {
                            refreshNextTurn();
                        }
                    }
                }
            }
        }
    }
})();

var clearBtn = document.getElementById('clear');
clearBtn.onclick = function() {
    game.clear();
    var cells = document.getElementsByClassName('game-cell');
    if (cells.length > 1) {
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].hasAttribute('marked')) {
                cells[i].removeAttribute('marked');
            }
        }
    }
    updateScore();
    refreshNextTurn();
    game.lock = false;
}
