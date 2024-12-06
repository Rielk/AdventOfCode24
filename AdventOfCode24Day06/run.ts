import { error } from "console";
import { mapInput } from "../inputs/getInput";
import { Guard } from "./Guard";

var example = false;

var thisArgs: { guard: Guard | undefined } = { guard: undefined };
var map = mapInput(function (line, y) {
    var split = line.split('');
    for (let x = 0; x < split.length; x++) {
        if (split[x] == '^')
            this.guard = new Guard(x, y);
    }
    return split.map(c => c == '#');
}, 6, example, thisArgs)
if (thisArgs.guard == undefined)
    throw error("No guard found");
var guard = thisArgs.guard;

var { visited } = guard.walk(map);

var visitedCount = visited.reduce((n, row) => {
    return row.reduce((m, col) => {
        if (col)
            return m + 1;
        return m;
    }, n);
}, 0);

var loopCount = map.reduce((n, row, j) => {
    return row.reduce((m, _, i) => {
        var newMap = copyMapWithObstruction(i, j);
        if (newMap == undefined)
            return m;
        var { loop } = guard.walk(newMap);
        return loop ? m+1: m;
    }, n);
}, 0);

function copyMapWithObstruction(x: number, y: number): boolean[][] | undefined {
    if (map[y][x])
        return undefined;
    return map.map((row, j) => row.map((col, i) => col || (i == x && j == y)));
}

console.log(visitedCount);
console.log(loopCount);
