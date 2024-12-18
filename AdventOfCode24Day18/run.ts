import { Array2D } from "../general/array2D";
import { runDijkstraAlgorithm } from "../general/Dijkstra/dijkstra";
import { Vector2 } from "../general/vector2";
import { mapInput } from "../inputs/getInput";
import { Node } from "./state";

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

function run(): { weight: number | undefined; finalNode: Node | undefined; } {
    let startNode = new Node(new Vector2(0, 0), byteLocations);
    let { weight, finalNode } = runDijkstraAlgorithm(startNode, n => {
        return n.loc.equals(new Vector2(size - 1, size - 1));
    }) ?? {};
    return { weight: weight, finalNode: finalNode }
}

function findBreakByte() : Vector2 | undefined {
    //This might run quicker if done using a binary search
    //Adding half the remaining, then removing...
    //But this works quick enough.
    let { finalNode } = run();
    while (incomingBytes.length > 0) {
        let nextByte: Vector2 = incomingBytes.shift()!;
        byteLocations.setValue(nextByte, true);
        if (finalNode?.removeNodeFromPrevious(n => n.loc.equals(nextByte))) {
            finalNode = run().finalNode;
            if (finalNode == undefined)
                return nextByte;
        }
    }
}

let { weight } = run();
let breakByte = findBreakByte();

console.log(weight);
console.log(`${breakByte?.x},${breakByte?.y}`);
