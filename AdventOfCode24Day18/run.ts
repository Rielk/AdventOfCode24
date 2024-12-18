import { Array2D } from "../general/array2D";
import { runDijkstraAlgorithm } from "../general/Dijkstra/dijkstra";
import { Vector2 } from "../general/vector2";
import { mapInput } from "../inputs/getInput";
import { State } from "./state";

var example = false;

var size = example ? 7 : 71;
var simCount = example ? 12 : 1024;

var incomingBytes = mapInput(line => {
    let split = line.split(',');
    return new Vector2(parseInt(split[0]), parseInt(split[1]));
}, 18, example);
var byteLocations = new Array2D<boolean>(size, size, false);

for (let i = 0; i < simCount; i++) {
    byteLocations.setValue(incomingBytes.shift()!, true);
}

let startState = new State(new Vector2(0, 0), byteLocations);
let { weight } = runDijkstraAlgorithm(startState, n => {
    return n.loc.equals(new Vector2(size-1, size-1));
}) ?? {};

console.log(weight);
