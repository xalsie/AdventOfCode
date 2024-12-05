class Day5 {
    constructor(filePath) {
        this.filePath = filePath;
        this.getInput();
    }

    run() {
        this.part1(); // 5248
        this.part2(); // 4507
    }

    part1() {
        const validOrder = [];

        for(let i = 0; i < this.page.length; i++) {
            const page = this.page[i];

            let pageCount = page.length - 1;
            let orderCount = 0;

            for(let j = 0; j < page.length; j++) {
                const num1 = page[j];
                const num2 = page[j + 1];

                if (num2 === undefined) {
                    break;
                }

                let check = this.checkRegle(num1, num2);
                if (check) {
                    orderCount++;
                } else {
                    break;
                }
            }

            if (orderCount === pageCount) {
                validOrder.push(page);
            }
        }

        const count = validOrder.map(order => order[
            Math.floor(order.length / 2)
        ]).reduce((acc, curr) => acc + parseInt(curr), 0);

        console.log('total 1: ', count);
    }

    checkRegle(num1, num2, permutation = false) {
        for(let i = 0; i < this.regle.length; i++) {
            const regle = this.regle[i];

            const num1Regle = regle[0];
            const num2Regle = regle[1];

            if (permutation === false) {
                if(num1 === num1Regle && num2 === num2Regle) {
                    return true;
                }
            } else if (permutation === true) {
                if((num1 === num1Regle || num1 === num2Regle) && (num2 === num1Regle || num2 === num2Regle)) {
                    if (num1 === num1Regle && num2 === num2Regle) {
                        return true;
                    } else if (num1 === num2Regle && num2 === num1Regle) {
                        return [num2, num1];
                    }
                }
            }
        }

        return false
    }

    part2() {
        const failOrder = [];

        for(let i = 0; i < this.page.length; i++) {
            const page = this.page[i];

            let pageCount = page.length - 1;
            let orderCount = 0;
            let permutation = false;

            for(let j = 0; j < page.length; j++) {
                const num1 = page[j];
                const num2 = page[j + 1];

                if (num2 === undefined) {
                    break;
                }

                let check = this.checkRegle(num1, num2, true);
                if (check) {
                    orderCount++;

                    if (Array.isArray(check)) {
                        page[j] = check[0];
                        page[j + 1] = check[1];
                        permutation = true;
                        j = -1;
                    }

                    if (orderCount === pageCount && permutation) {
                        failOrder.push(page);
                    }
                }
            }
        }

        const count = failOrder.map(order => order[
            Math.floor(order.length / 2)
        ]).reduce((acc, curr) => acc + parseInt(curr), 0);

        console.log('total 2: ', count);
    }

    getInput(){
        const fs = require('node:fs');
        const data = fs.readFileSync(this.filePath, 'utf8');

        this.regle = data.trim().split('\r\n').filter(line => line.includes('|')).map(line => line.split('|'));
        this.page = data.trim().split('\r\n').filter(line => line.includes(',')).map(line => line.split(','));
    }
}

module.exports = Day5;
