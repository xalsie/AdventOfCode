const Day1 = require('./Day1/main');
const Day2 = require('./Day2/main');

const day1 = new Day1('./inputs/puzzleInput_1.txt'); // https://adventofcode.com/2024/day/1/input
const day2 = new Day2('./inputs/puzzleInput_2.txt'); // https://adventofcode.com/2024/day/2/input

day1.run();
day2.run();
