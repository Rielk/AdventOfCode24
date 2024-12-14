import { Vector2 } from "../general/vector2";
import { mapInput } from "../inputs/getInput";

var example = false;

const boardSize = { x: example ? 11 : 101, y: example ? 7 : 103 };

var robots = mapInput(line => {
    var split = line.split(' ');
    var pSplit = split[0].split('=')[1].split(',').map(c => parseInt(c));
    var vSplit = split[1].split('=')[1].split(',').map(c => parseInt(c));
    return { p: new Vector2(pSplit[0], pSplit[1]), v: new Vector2(vSplit[0], vSplit[1]) };
}, 14, example);

function calcPositionAfterTime(robot: { p: Vector2, v: Vector2 }, time: number, boardSize: { x: number, y: number }): Vector2 {
    let dv = robot.v.multiply(time);
    let newP = robot.p.add(dv);
    return newP.constrainWrap(boardSize);
}

function calcSafetyFactor(robotPositions: Vector2[], boardSize: { x: number, y: number }) {
    let halfWidth = Math.floor(boardSize.x / 2), halfHeight = Math.floor(boardSize.y / 2);
    let a = 0, b = 0, c = 0, d = 0;
    for (let i = 0; i < robotPositions.length; i++) {
        const pos = robotPositions[i];
        if (pos.x < halfWidth) {
            if (pos.y < halfHeight)
                a++
            else if (pos.y > halfHeight)
                b++
        }
        else if (pos.x > halfWidth) {
            if (pos.y < halfHeight)
                c++
            else if (pos.y > halfHeight)
                d++
        }
    }
    return a * b * c * d;
}

let positions100s = robots.map(robot => calcPositionAfterTime(robot, 100, boardSize));
let safety100s = calcSafetyFactor(positions100s, boardSize);

console.log(safety100s);
