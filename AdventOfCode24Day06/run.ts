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
const mapHeight = map.length
const mapWidth = map[0].length;

var visited = guard.walk(map);

var visitedCount = visited.reduce((n, row) => {
    return row.reduce((m, col) => {
        if (col)
            return m + 1;
        return m;
    }, n);
}, 0);

var loopCount = 0;
var newMap = map.map(row => row.map(col => col));
for (let j = 0; j < mapHeight; j++)
    for (let i = 0; i < mapWidth; i++) {
        if (map[j][i] || !visited[j][i])
            continue;
        newMap[j][i] = true;
        if (guard.checkForLoop(newMap))
            loopCount++;
        newMap[j][i] = false;
    }

console.log(`Positions visited by guard; ${visitedCount}`);
console.log(`Positions which cause a loop: ${loopCount}`);
