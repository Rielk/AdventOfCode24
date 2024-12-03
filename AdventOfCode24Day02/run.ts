import { copyArrayWithElementRemoved as arrayAfterSplice } from "../general/arrayUtils";
import { mapInput } from "../inputs/getInput";

var example = false;

var data = mapInput((line) => {
    var split = line.split(' ');
    return split.map(value => parseInt(value));
}, 2, example);

function checkSafe(report: Array<number>, dampener: boolean): boolean { return findDanger(report, dampener) < 0 }
function findDanger(report: Array<number>, dampener: boolean, startAt: number = 0): number {
    if (report.length < startAt + 2)
        return -1;
    var w = report[startAt - 1], x = report[startAt], y = report[startAt + 1], i = startAt + 1;
    while (i < report.length) {
        if (x == y || (w != undefined && x < y != w < x) || Math.abs(x - y) > 3)
            if (dampener) {
                var diLast = findDanger(arrayAfterSplice(report, i), false, i - 1);
                if (diLast < 0 || diLast > i)
                    return diLast;
                else {
                    var diFirst = findDanger(arrayAfterSplice(report, i - 1), false, i - 2);
                    if (diFirst < 0 || diFirst > i)
                        return diFirst;
                    else {
                        return findDanger(arrayAfterSplice(report, i - 2), false, i - 2);
                    }
                }
            }
            else
                return i;
        w = x;
        x = y;
        y = report[++i];
    }
    return -1;
}

var safeCount = data.reduce((sum, report) => {
    if (checkSafe(report, false))
        sum++;
    return sum;
}, 0);

var safeCountWithDampener = data.reduce((sum, report) => {
    if (checkSafe(report, true))
        sum++;
    return sum;
}, 0);

console.log(`Total Safe Levels: ${safeCount}`);
console.log(`Total Safe Levels with Dampener: ${safeCountWithDampener}`);
