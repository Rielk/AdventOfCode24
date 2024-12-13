import { readFileSync } from 'node:fs';
import { Array2D } from '../general/array2D';
import { Vector2 } from '../general/vector2';

export function getInput(day: number, example: boolean): string {
    if (!example) {
        try {
            var ret = readFileSync(`./inputs/${day}.txt`, 'utf8');
            if (ret)
                return ret;
            else
                console.error(`Input is empty for Day ${day}. Please add it to the text file called "${day}.txt" in the inputs folder.\nUsing the Example data instead.`);
        } catch (err) {
            console.error(`Input not provided for Day ${day}. Please add it as a text file called "${day}.txt" to the inputs folder.\nUsing the Example data instead.`);
        }
    }
    return readFileSync(`./inputs/Example${day}.txt`, 'utf8');
}

export function getInputLineByLine(day: number, example: boolean): Array<string> {
    var data = getInput(day, example);
    return data.split(/\r?\n/);
}

export function getInputInLineBatches(batchLength: number, day: number, example: boolean): Array<Array<string>> {
    var data = getInputLineByLine(day, example);
    var ret = [], batch = [];
    for (let i = 0; i < data.length; i++) {
        batch.push(data[i]);
        if ((i + 1) % batchLength == 0) {
            ret.push(batch);
            batch = [];
        }
    }
    if (batch.length > 0)
        ret.push(batch);
    return ret;
}

export function processInput(callbackfn: (value: string, index: number, array: string[]) => void, day: number, example: boolean, thisArg?: any): void {
    var data = getInputLineByLine(day, example);
    data.forEach(callbackfn, thisArg);
}

export function mapInput<T>(callbackfn: (value: string, index: number, array: string[]) => T, day: number, example: boolean, thisArg?: any): Array<T> {
    var data = getInputLineByLine(day, example);
    return data.map(callbackfn, thisArg);
}

export function mapInputLineBatches<T>(callbackfn: (batch: string[], index: number, array: string[][]) => T, batchLength: number, day: number, example: boolean, thisArg?: any): Array<T> {
    var data = getInputInLineBatches(batchLength, day, example);
    return data.map(callbackfn, thisArg);
}

export function mapArray2DInput<T>(callbackfn: (value: string, index: Vector2, array: string[][]) => T, splitChar: string, day: number, example: boolean, thisArg?: any): Array2D<T> {
    var data = mapInput(line => line.split(splitChar), day, example);
    return new Array2D(data.length, data[0].length, (x, y) => callbackfn(data[y][x], new Vector2(x, y), data));
}
