import { Vector2 } from "../general/vector2";
import { mapInputLineBatches } from "../inputs/getInput";

var example = false;

var data = mapInputLineBatches(batch => {
    var numbers = batch.map(line => (line.match(/\d+/g) ?? []).reduce((obj, value, i) => {
        return { ...obj, [i == 0 ? 'x' : 'y']: value };
    }, { x: -1, y: -1 }));
    return {
        A: new Vector2(numbers[0].x, numbers[0].y),
        B: new Vector2(numbers[1].x, numbers[1].y),
        prize: new Vector2(numbers[2].x, numbers[2].y)
    };
}, 4, 13, example);

function tokensForPrize(input: { A: Vector2, B: Vector2, prize: Vector2 }): number {
    let { A, B, prize } = input;
    // i*A.x + j*B.x = prize.x;  i*A.y + j*B.y = prize.y;
    // i = (prize.x - j*B.x) / A.x
    // (prize.x - j*B.x)*A.y + j*B.y*A.x = prize.y*A.x;
    // j*(B.y*A.x - B.x*A.y) = prize.y*A.x - prize.x*A.y;
    let j = (prize.y * A.x - prize.x * A.y) / (B.y * A.x - B.x * A.y);
    if (Math.floor(j) != j)
        return 0;
    let i = (prize.x - j * B.x) / A.x;
    if (Math.floor(i) != i)
        return 0;
    return 3 * i + j;
}

var tokens = data.map(v => tokensForPrize(v)).reduce((x, y) => x + y);

console.log(tokens);
