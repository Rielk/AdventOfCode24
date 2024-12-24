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


export function get2SectionInputByLine(day: number, example: boolean): { section1: string[]; section2: string[]; } {
    var data = getInputLineByLine(day, example);
    var index = data.findIndex(line => !line.trim());
    return {
        section1: data.slice(0, index),
        section2: data.slice(index + 1, data.length)
    }
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

export function processInput(
    callbackfn: (value: string, index: number, array: string[]) => void,
    day: number, example: boolean, thisArg?: any): void {
    var data = getInputLineByLine(day, example);
    data.forEach(callbackfn, thisArg);
}

export function mapInput<T>(
    callbackfn: (value: string, index: number, array: string[]) => T,
    day: number, example: boolean, thisArg?: any): Array<T> {
    var data = getInputLineByLine(day, example);
    return data.map(callbackfn, thisArg);
}

export function mapInputLineBatches<T>(
    callbackfn: (batch: string[], index: number, array: string[][]) => T,
    batchLength: number, day: number, example: boolean, thisArg?: any): Array<T> {
    var data = getInputInLineBatches(batchLength, day, example);
    return data.map(callbackfn, thisArg);
}

export function mapArray2DInput<T>(
    callbackfn: (value: string, index: Vector2, array: string[][]) => T,
    splitChar: string, day: number, example: boolean): Array2D<T> {
    var data = mapInput(line => line.split(splitChar), day, example);
    return new Array2D(data.length, data[0].length, (x, y) => callbackfn(data[y][x], new Vector2(x, y), data));
}

export function process2SectionInput<T1, T2>(
    callbackfn1: ((value: string, index: number, array: string[]) => T1),
    callbackfn2: (value: string, index: number, array: string[]) => T2,
    day: number, example: boolean, thisArg?: any) {
    var { section1, section2 } = get2SectionInputByLine(day, example);
    section1.forEach(callbackfn1, thisArg);
    section2.forEach(callbackfn2, thisArg)
}

export function map2SectionInput<TM1, TE1, TM2, TE2>(
    callbackfn1: ((value: string, index: number, array: string[]) => TM1),
    postProcess1: ((mid: TM1[]) => TE1),
    callbackfn2: (value: string, index: number, array: string[]) => TM2,
    postProcess2: ((mid: TM2[]) => TE2),
    day: number, example: boolean, thisArg?: any): { data1: TE1; data2: TE2; } {
    var { section1, section2 } = get2SectionInputByLine(day, example);
    return {
        data1: postProcess1(section1.map(callbackfn1, thisArg)),
        data2: postProcess2(section2.map(callbackfn2, thisArg))
    }
}
