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
var guard = thisArgs.guard;

var visited = guard?.walk(map);

function countVisited(): number | undefined {
    if (visited == undefined)
        return undefined;
    var count = 0;
    for (let i = 0; i < visited.length; i++) {
        const row = visited[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j])
                count++;
        }
    }
    return count;
}

console.log(countVisited());
