class Day4 {
    constructor(filePath) {
        this.filePath = filePath;
        this.wordSearch = this.getInput();
        this.calculateGridDimensions();
    }

    run() {
        this.part1(); // 2297
        this.part2(); // 1745
    }

    /**
     * J'avais déjà fait un exercice similaire en JS pour apprendre le VueJS,
     * et tué le temps pendant mes vacances
     * je vais donc réutiliser le code pour la première partie
     * 
     * https://github.com/xalsie/motMeleVuejs/blob/main/src/motMelee.js
     */

    part1() {
        let total = 0;

        const word = "XMAS";

        const firstLetter = word[0];
        const positions = this.findLetterPositions(firstLetter);
        const wordLength = word.length;

        const directions = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 }, // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }, // right
            { row: -1, col: -1 }, // up-left
            { row: -1, col: 1 }, // up-right
            { row: 1, col: -1 }, // down-left
            { row: 1, col: 1 }, // down-right
        ];

        positions.forEach((pos) => {
            directions.forEach((dir) => {
                if (
                    (dir.row === -1 && pos.row - wordLength < -1) || // up
                    (dir.row === 1 && pos.row + wordLength > this.numRows) || // down
                    (dir.col === -1 && pos.col - wordLength < -1) || // left
                    (dir.col === 1 && pos.col + wordLength > this.numCols) || // right
                    (dir.row === -1 &&
                        dir.col === -1 &&
                        (pos.row - wordLength < -1 ||
                            pos.col - wordLength < -1)) || // up-left
                    (dir.row === -1 &&
                        dir.col === 1 &&
                        (pos.row - wordLength < -1 ||
                            pos.col + wordLength > this.numCols)) || // up-right
                    (dir.row === 1 &&
                        dir.col === -1 &&
                        (pos.row + wordLength > this.numRows ||
                            pos.col - wordLength < -1)) || // down-left
                    (dir.row === 1 &&
                        dir.col === 1 &&
                        (pos.row + wordLength > this.numRows ||
                            pos.col + wordLength > this.numCols)) // down-right
                ) {
                    return;
                }

                const wordPositions = this.checkWordInDirection(
                    word,
                    pos,
                    dir
                );

                if (wordPositions) {
                    total++;
                }
            });
        });

        console.log('total 1: ', total);
    }

    findLetterPositions(letter) {
        const grid = this.wordSearch
        const positions = [];

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === letter) {
                    positions.push({ row, col });
                }
            }
        }

        return positions;
    }

    checkWordInDirection(word, startPos, dir) {
        const grid = this.wordSearch;
        const numRows = this.numRows
        const numCols = this.numCols
        let currentRow = startPos.row;
        let currentCol = startPos.col;
        let wordLength = word.length - 1;

        const endRow = currentRow + dir.row * wordLength;
        const endCol = currentCol + dir.col * wordLength;

        if (
            endRow < 0 ||
            endRow >= numRows ||
            endCol < 0 ||
            endCol >= numCols
        ) {
            return null;
        }

        const wordPositions = [{ row: currentRow, col: currentCol }];

        for (let i = 0; i < word.length; i++) {
            if (grid[currentRow][currentCol] !== word[i]) {
                return null;
            }
            currentRow += dir.row;
            currentCol += dir.col;

            wordPositions.push({ row: currentRow, col: currentCol });
        }

        currentRow -= dir.row;
        currentCol -= dir.col;

        return true;
    }

    calculateGridDimensions() {
        const grid = this.wordSearch;
        const numCols = grid[0].length;
        const cells = numCols * grid.length;
        const numRows = Math.ceil(cells / numCols);

        this.numRows = numRows;
        this.numCols = numCols;
    }

    part2() {
        let total = 0;

        const word = "MAS";

        const firstLetter = word[1];
        const positions = this.findLetterPositions(firstLetter);

        const wordLength = word.length - 1;

        positions.forEach((pos) => {
            if(
                (pos.row - wordLength < -1 || pos.col - wordLength < -1) ||
                (pos.row - wordLength < -1 || pos.col + wordLength > this.numCols) ||
                (pos.row + wordLength > this.numRows || pos.col - wordLength < -1) ||
                (pos.row + wordLength > this.numRows || pos.col + wordLength > this.numCols)
            ) {
                return;
            }
            
            if(
                (
                    this.wordSearch[pos.row - 1][pos.col - 1] + this.wordSearch[pos.row][pos.col] + this.wordSearch[pos.row + 1][pos.col + 1] === word ||
                    this.wordSearch[pos.row + 1][pos.col + 1] + this.wordSearch[pos.row][pos.col] + this.wordSearch[pos.row - 1][pos.col - 1] === word
                ) && (
                    this.wordSearch[pos.row - 1][pos.col + 1] + this.wordSearch[pos.row][pos.col] + this.wordSearch[pos.row + 1][pos.col - 1] === word ||
                    this.wordSearch[pos.row + 1][pos.col - 1] + this.wordSearch[pos.row][pos.col] + this.wordSearch[pos.row - 1][pos.col + 1] === word
                )
            ) {
                total++;
            }
        });

        console.log('total 2: ', total);
    }

    getInput() {
        const fs = require('node:fs');
        const data = fs.readFileSync(this.filePath, 'utf8');
        let grid = data.split("\r\n").filter(line => line.length > 0);
        return grid;
    }
}

module.exports = Day4;
