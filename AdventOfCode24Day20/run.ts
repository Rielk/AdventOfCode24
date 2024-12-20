import { stat } from "fs";
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

let cheats = states.map2D(state => {
    if (state == undefined)
        return undefined;
    let timeSaves: Array<{ timeSave: number, end: Vector2 }> = [];
    for (let dir of [0, 1, 2, 3]) { //This is technically not a complete list, but works for input
        let checkLoc = state.location.moveDirection(dir, 2);
        let checkState = states.getValue(checkLoc);
        if (checkState == undefined)
            continue;
        let timeSave = checkState.distance - state.distance - 2;
        if (timeSave > 0)
            timeSaves.push({ timeSave: timeSave, end: checkLoc });
    }
    return timeSaves
});
let goodCheats = cheats.flat(2).reduce((t, cheat) => {
    if ((cheat?.timeSave ?? 0) >= 100)
        t++;
    return t;
} , 0);

console.log(goodCheats);
