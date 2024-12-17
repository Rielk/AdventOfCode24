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

let startState = new State(startPos, 0, maze);
let { weight: lowestScore } = runDijkstraAlgorithm(startState, state => state.loc.equals(endPos)) ?? { weight: undefined };

console.log(lowestScore);
