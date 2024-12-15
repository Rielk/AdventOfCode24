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

function stepPostision(robots: { p: Vector2, v: Vector2 }[], boardSize: { x: number, y: number }): { p: Vector2, v: Vector2 }[] {
    robots.forEach(robot => robot.p = robot.p.add(robot.v).constrainWrap(boardSize));
    return robots;
}

function calcSafetyFactor(robots: { p: Vector2, v: Vector2 }[], boardSize: { x: number, y: number }) {
    let halfWidth = Math.floor(boardSize.x / 2), halfHeight = Math.floor(boardSize.y / 2);
    let a = 0, b = 0, c = 0, d = 0;
    for (let i = 0; i < robots.length; i++) {
        const pos = robots[i].p;
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

function calcVariance(robots: { p: Vector2, v: Vector2 }[]): { x: number, y: number } {
    let mean = robots.reduce((x, r) => x.add(r.p), new Vector2(0, 0)).divide(robots.length);
    return robots.reduce((vars, r) => {
        let varX = vars.x + Math.pow(r.p.x - mean.x, 2);
        let varY = vars.y + Math.pow(r.p.y - mean.y, 2);
        return new Vector2(varX, varY);
    }, new Vector2(0, 0)).divide(robots.length);
}

function calcMinConvergence(Tx: number, Ty: number, boardSize: { x: number, y: number }): number {
    //T mod 101 = Tx; T - 101a = Tx; T = Tx + 101a;
    //T mod 103 = Ty; T - 103b = Ty; T = Ty + 103b;
    //Tx + 101a = Ty + 103b;
    //Tx - Ty = 103b - 101a = 101(b - a) + 2b;
    //Assert that a is minimally greater than b, so b-a=-1|0;
    //Tx - Ty = -101 + 2b | Tx - Ty = 2b;
    //b = (101 + Tx - Ty) / 2 | b = (Tx - Ty) / 2
    //T = Ty + 103b;
    let dif = Tx - Ty;
    if (dif % 2 == 0)
        var b = dif / 2;
    else
        var b = (boardSize.x + dif) / 2;
    return Ty + (boardSize.y * b);
}

let safety100s: number | undefined;
let minVar: { x: number, y: number } = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };
let minVarIndex: { x: number, y: number } = { x: 0, y: 0 }
for (let i = 1; i <= Math.max(boardSize.x, boardSize.y, 100); i++) {
    robots = stepPostision(robots, boardSize);
    if (i == 100)
        safety100s = calcSafetyFactor(robots, boardSize);
    let vars = calcVariance(robots);
    if (minVar.x > vars.x) {
        minVar.x = vars.x;
        minVarIndex.x = i;
    }
    if (minVar.y > vars.y) {
        minVar.y = vars.y;
        minVarIndex.y = i;
    }
}
let christmasTreeTime = calcMinConvergence(minVarIndex.x, minVarIndex.y, boardSize);

console.log(`Safety Factor after 100 seconds: ${safety100s}`);
console.log(`Christas Tree first appears at: ${christmasTreeTime} seconds`);
