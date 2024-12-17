import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { map2SectionInput } from "../inputs/getInput";
import { Box } from "./box";
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
        let loc = new Vector2(i, j);
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

    var wideBoxes: Box[] = [];
    var wideMap = new Array2D<Tile>(map.height, map.width * 2, (x, y) => {
        let value = map.getValue(new Vector2(Math.floor(x / 2), y))!.startingValue;
        if (value == 'O')
            value = x % 2 == 0 ? '[' : ']';
        let loc = new Vector2(x, y);
        if (value == '[')
            wideBoxes.push(new Box(2, loc))
        return new Tile(value, loc);
    });
    wideBoxes.forEach(b => b.init(wideMap));


function executeWalk(start: Vector2, map: Array2D<Tile>, moves: Vector2[]) {
    let currLoc = start;
    moves.forEach(move => {
        let nextLoc = currLoc.add(move);
        if (map.getValue(nextLoc)?.moveInto(move, map))
            currLoc = nextLoc;
    });
}

executeWalk(robotStart, map, moves);
let sumOfGPSCoords = map.map2D((v) => v.box?.gpsCoords ?? 0)
    .reduce((n, arr) => n + arr.reduce((x, y) => x + y), 0);

executeWalk(new Vector2(robotStart.x * 2, robotStart.y), wideMap, moves);
let sumOfWideGPSCoords = wideMap.map2D((v) => v.box?.gpsCoords ?? 0)
    .reduce((n, arr) => n + arr.reduce((x, y) => x + y), 0);

console.log(sumOfGPSCoords);
console.log(sumOfWideGPSCoords);
