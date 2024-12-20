import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { mapArray2DInput } from "../inputs/getInput";
import { State } from "./state";

var example = false;

var start: Vector2 = undefined!, end: Vector2 = undefined!;
var maze = mapArray2DInput((value, loc) => {
    if (value == 'S')
        start = loc;
    else if (value == 'E')
        end = loc;
    return value != '#';
}, '', 20, example);

var states = new Array2D<State>(maze.length, maze[0].length);
var startState = new State(start, 0);
states.setValue(start, startState);
{
    let nextState = startState;
    while (nextState.location.equals(end) == false)
        for (let adj of nextState.location.adjacent()) {
            if (!maze.getValue(adj))
                continue;
            let adjState = states.getValue(adj);
            if (adjState != undefined)
                continue;
            adjState = new State(adj, nextState.distance + 1);
            states.setValue(adj, adjState);
            nextState = adjState
        }
}

function countCheats(state: State, maxLength: number, minSave: number): number {
    let cheats = 0;
    for (let checkLoc of state.location.withinDistance(maxLength)) {
        let checkState = states.getValue(checkLoc);
        if (checkState == undefined)
            continue;
        let timeSave = checkState.distance - state.distance - state.location.distanceTo(checkLoc);
        if (timeSave >= minSave)
            cheats++;
    }
    return cheats;
}

let cheatCountsByLoc = states.map2D(state => {
    if (state == undefined)
        return {short: 0, long: 0};
    return {
        short: countCheats(state, 2, 100),
        long: countCheats(state, 20, 100)
    };
});
let cheatCounts = cheatCountsByLoc.flat(2).reduce((t, count) => {
    return {
        short: t.short + (count.short ?? 0),
        long: t.long + (count.long ?? 0)
    };
}, { short: 0, long: 0 });

console.log(`Total cheats with max length 2: ${cheatCounts.short}`);
console.log(`Total cheats with max length 20: ${cheatCounts.long}`);
