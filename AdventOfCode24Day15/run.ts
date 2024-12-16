import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { map2SectionInput } from "../inputs/getInput";
import { Tile } from "./tile";

var example = false;

const directions = new Map<string, Vector2>([
    ['v', new Vector2(0, 1)],
    ['^', new Vector2(0, -1)],
    ['>', new Vector2(1, 0)],
    ['<', new Vector2(-1, 0)]
]);

var robotStart: Vector2 = undefined!;
var { data1: map, data2: moves } = map2SectionInput((line, j) => {
    return line.split('').map((c, i) => {
        let loc = new Vector2(i,j);
        if (c == '@')
            robotStart = loc;
        return new Tile(c, loc);
    })
}, mid => Array2D.fromArray(mid),
    (line) => {
        return line.split('').map(c => {
            return directions.get(c) ?? new Vector2(0, 0);
        });
    }, mid => mid.flat(),
    15, example);

function executeWalk(start: Vector2, map: Array2D<Tile>, moves: Vector2[]) {
    let currLoc = start;
    moves.forEach(move => {
        let nextLoc =  currLoc.add(move);
        if (map.getValue(nextLoc)?.moveInto(move, map))
            currLoc = nextLoc;
    });
}

executeWalk(robotStart, map, moves);
let sumOfGPSCoords = map.map2D((v, index) => v.box ? (100 * index.y + index.x) : 0)
    .reduce((n, arr) => n + arr.reduce((x, y) => x + y), 0);

console.log(sumOfGPSCoords);
