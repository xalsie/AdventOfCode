const fs = require('node:fs');

class Day2 {
    constructor(filePath) {
        this.filePath = filePath;
        this.reports = this.getInput();
    }

    run() {
        this.part1();
        this.part2();
    }

    part1() {
        const count = this.reports.filter(report => this.isLinear(report, false)).length;
        console.log('Part 1:', count);
    }

    part2() {
        const count = this.reports.filter(report => this.isLinear(report, true)).length;
        console.log('Part 2:', count);
    }

    isLinear(report, problemDampener) {
        const checkLinear = (differences) => {
            const increasing = differences.every(d => d > 0 && d <= 3 && d >= 1);
            const decreasing = differences.every(d => d < 0 && Math.abs(d) <= 3 && Math.abs(d) >= 1);
            return increasing || decreasing;
        };

        if (!problemDampener) {
            const differences = report.slice(1).map((num, i) => num - report[i]);
            return checkLinear(differences);
        }

        if (this.isLinear(report, false)) {
            return true;
        }

        for (let index = 0; index < report.length; index++) {
            const reportWithRemovedElement = report.slice(0, index).concat(report.slice(index + 1));
            if (this.isLinear(reportWithRemovedElement, false)) {
                return true;
            }
        }

        return false;
    }

    getInput() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.trim().split('\n').map(line => line.split(' ').map(Number));
    }
}

module.exports = Day2;
