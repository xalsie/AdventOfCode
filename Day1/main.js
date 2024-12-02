const fs = require('node:fs');

class Day1 {
    constructor(filePath) {
        this.filePath = filePath;
        const [left, right] = this.getInput();
        this.left = left;
        this.right = right;
    }

    run() {
        this.part1(); // 2086478
        this.part2(); // 24941624
    }

    part1() {
        const left = [...this.left];
        const right = [...this.right];
        left.sort((a, b) => a - b);
        right.sort((a, b) => a - b);

        const count = left.reduce((sum, leftNum, index) => sum + Math.abs(leftNum - right[index]), 0);

        console.log('total distance 1: ', count);
    }

    part2() {
        const count = this.left.reduce((sum, num) => sum + num * this.right.filter(rightNum => rightNum === num).length, 0);
        console.log('total distance 2: ', count);
    }

    getInput() {
        const left = [];
        const right = [];

        const data = fs.readFileSync(this.filePath, 'utf8');
        data.split('\n').forEach(line => {
            if (line.trim()) {
                const [x, y] = line.split('   ').map(Number);
                left.push(x);
                right.push(y);
            }
        });

        return [left, right];
    }
}

module.exports = Day1;
