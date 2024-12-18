import { Vector2 } from "../general/vector2";
import { mapInputLineBatches } from "../inputs/getInput";

var example = false;

var data = mapInputLineBatches(batch => {
    var numbers = batch.map(line => line.match(/\d+/g)?.map(d => parseInt(d)) ?? []);
    return {
        A: new Vector2(numbers[0][0], numbers[0][1]),
        B: new Vector2(numbers[1][0], numbers[1][1]),
        prize: new Vector2(numbers[2][0], numbers[2][1])
    };
}, 4, 13, example);

function tokensForPrize(input: { A: Vector2, B: Vector2, prize: Vector2 }, prizeOffset?: number): number {
    let { A, B, prize } = input;
    if (prizeOffset)
        prize = new Vector2(prize.x + prizeOffset, prize.y + prizeOffset);
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

var tokensWithoutOffset = data.map(v => tokensForPrize(v)).reduce((x, y) => x + y);
var tokensWithOffset = data.map(v => tokensForPrize(v, 10000000000000)).reduce((x, y) => x + y);

console.log(`Tokens Required for the Prizes: ${tokensWithoutOffset}`);
console.log(`Tokens Required for the Prizes with offset: ${tokensWithOffset}`);
