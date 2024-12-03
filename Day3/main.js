const fs = require('node:fs');

class Day3 {
    constructor(filePath) {
        this.filePath = filePath;
        this.corruptedMemory = this.getInput();
    }

    run() {
        this.part1(); // 192767529
        this.part2(); // 104083373
    }

    part1() {
        const data = this.corruptedMemory;
        let total = 0;

        data.forEach((line) => {
            const regex = /mul\((\d+),(\d+)\)/g;
            let match = regex.exec(line);
            while (match !== null) {
                total += parseInt(match[1]) * parseInt(match[2]);
                match = regex.exec(line);
            }
        });

        console.log('total 1: ', total);        
    }

    part2() {
        const data = this.corruptedMemory;

        let total = 0;
        let enabled = true;

        const regex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
        let match = regex.exec(data);
        while (match !== null) {
            if (match[0] === 'do()') {
                enabled = true;
            } else if (match[0] === "don't()") {
                enabled = false;
            } else if (enabled && match[1] && match[2]) {
                total += parseInt(match[1]) * parseInt(match[2]);
            }
            match = regex.exec(data);
        }

        console.log('total 2: ', total);
    }

    getInput() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.split('\n');
    }
}

module.exports = Day3;
