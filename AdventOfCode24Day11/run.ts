import { time } from "node:console";
import { getInput } from "../inputs/getInput";

var example = false;

var initialStones = getInput(11, example).split(' ').map(s => parseInt(s));

function calcStonesAfterNBlinks(initialStones: number[], times: number): number {
    var count: number = 0;
    var cache: Array<Map<number, number>> = new Array(times + 1);
    for (let i = 0; i < cache.length; i++)
        cache[i] = new Map();

    for (let stone of initialStones)
        count += calcStone(stone, times);
    return count;

    function calcStone(stone: number, n: number): number {
        if (n <= 0)
            return 1;

        let cachedValue = cache[n].get(stone);
        if (cachedValue != undefined)
            return cachedValue;

        if (stone == 0)
            return setCache(calcStone(1, n - 1));
        let order = Math.floor(Math.log10(stone)) + 1;
        if (order % 2 == 0) {
            let magnitude = Math.pow(10, order / 2);
            let right = stone % magnitude;
            let left = (stone - right) / magnitude;
            return setCache(calcStone(left, n - 1) + calcStone(right, n - 1));
        }
        return setCache(calcStone(stone * 2024, n - 1));

        function setCache(x: number): number {
            cache[n].set(stone, x);
            return x;
        }
    }
}

const result25 = calcStonesAfterNBlinks(initialStones, 25);
const result75 = calcStonesAfterNBlinks(initialStones, 75);

console.log(`Stones after 25 Blinks: ${result25}`);
console.log(`Stones after 75 Blinks: ${result75}`);
