import { mapInput } from "../inputs/getInput";

var example = false;

var data = mapInput((line) => {
    var split = line.split(' ');
    return split.map(value => parseInt(value));
}, 2, example);

function checkSafe(report: Array<number>): boolean {
    if (report.length < 2)
        return true;
    const isIncreasing = report[0] < report[1];
    var x = report[0], y = report[1], i = 1;
    while (i < report.length) {
        if (x == y || x < y != isIncreasing || Math.abs(x - y) > 3)
            return false;
        x = y;
        y = report[++i];
    }
    return true;
}

var safeCount = data.reduce((sum, report) => {
    if (checkSafe(report))
        sum++;
    return sum;
}, 0);

console.log(`Total Safe Levels: ${safeCount}`);
