import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { map2SectionInput } from "../inputs/getInput";

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
        if (c == '@')
            robotStart = new Vector2(i, j);
        return {
            wall: c == '#',
            box: c == 'O'
        };
    })
}, mid => Array2D.fromArray(mid),
    (line) => {
        return line.split('').map(c => {
            return directions.get(c) ?? new Vector2(0, 0);
        });
    }, mid => mid.flat(),
    15, example);

function executeWalk(start: Vector2, map: Array2D<{ wall: boolean, box: boolean }>, moves: Vector2[]) {
    let currLoc = start;
    let nextLoc, checkLoc;
    moves.forEach(move => {
        checkLoc = nextLoc = currLoc.add(move);
        let hasBox = false;
        let checkTile;
        while ((checkTile = map.getValue(checkLoc))?.box) {
            hasBox = true;
            checkLoc = checkLoc.add(move);
        }
        if (checkTile == undefined || checkTile.wall)
            return;
        checkTile.box = hasBox;
        map.getValue(nextLoc)!.box = false;
        currLoc = nextLoc;
    });
}

executeWalk(robotStart, map, moves);
let sumOfGPSCoords = map.map2D((v, index) => v.box ? (100 * index.y + index.x) : 0)
    .reduce((n, arr) =>  n + arr.reduce((x,y) => x+y),0);

console.log(sumOfGPSCoords);
