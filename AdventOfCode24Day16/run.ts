import { CantorNegtivePairing } from "../general/CantorPairing";
import { runDijkstraAlgorithm } from "../general/Dijkstra/dijkstra";
import { Vector2 } from "../general/vector2";
import { mapArray2DInput } from "../inputs/getInput";
import { State } from "./state";

var example = false;

var startPos: Vector2 = new Vector2(-1, -1), endPos: Vector2 = new Vector2(-1, -1);
var maze = mapArray2DInput((c, i) => {
    if (c == 'S')
        startPos = i;
    if (c == 'E')
        endPos = i;
    return c != '#';
}, '', 16, example);

function countTilesOnBestPath(state: State, counted?: Set<number>) {
    if (counted == undefined)
        counted = new Set();
    const uid = CantorNegtivePairing(state.loc.x, state.loc.y);
    let count = counted.has(uid) ? 0 : 1;
    counted.add(uid)
    state.previousStates.forEach(s => {
        count += countTilesOnBestPath(s, counted);
    });
    return count;
}

let startState = new State(startPos, 0, maze);
let { weight: lowestScore, finalNode: endState } = runDijkstraAlgorithm(startState, state => state.loc.equals(endPos)) ?? {};
let tilesOnBestPath = countTilesOnBestPath(endState!);

console.log(lowestScore);
console.log(tilesOnBestPath);
