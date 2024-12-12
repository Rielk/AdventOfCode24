import { getInput } from "../inputs/getInput";

var example = false;

var initialStones = getInput(11, example).split(' ').map(s => parseInt(s));

function blinkNTimes(initialStones: number[], times: number) {
    var finalStones: number[] = [];
    for (let stone of initialStones)
        addStoneEnding(stone, times, finalStones);
    return finalStones;

    function addStoneEnding(stone: number, n: number, array: number[]): void {
        if (n <= 0) {
            array.push(stone);
            return;
        }
        if (stone == 0)
            return addStoneEnding(1, n - 1, array);
        let order = Math.floor(Math.log10(stone)) + 1;
        if (order % 2 == 0) {
            let magnitude = Math.pow(10, order/2);
            let right = stone % magnitude;
            let left = (stone - right) / magnitude;
            addStoneEnding(left, n - 1, array);
            addStoneEnding(right, n - 1, array);
            return;
        }
        return addStoneEnding(stone * 2024, n - 1, array);
    }
}

console.log(blinkNTimes(initialStones, 25).length);
