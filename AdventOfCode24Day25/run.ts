import {  processInputLineBatches } from "../inputs/getInput";
import { Key, Lock } from "./lockAndKey";

var example = false;

var keys: Key[] = [], locks: Lock[] = [];
processInputLineBatches(batch => {
    let isLock = batch[0][0] == '#';
    let prevRow = batch[0];
    let heights = new Array<number>();
    for (let r = 1; r <= 6; r++) {
        const nextRow = batch[r];
        for (let c = 0; c < nextRow.length; c++) {
            if (nextRow[c] != prevRow[c])
                heights[c] = r - 1;
        }
        prevRow = nextRow;
    }
    if (isLock)
        locks.push(new Lock(heights));
    else
        keys.push(new Key(heights.map(h => 5-h)));
}, 8, 25, example);

function compareAll() {
    let fits = 0;
    for (let key of keys)
        for (let lock of locks)
            if (key.fits(lock))
                fits++;
    return fits;
}

console.log(compareAll());
