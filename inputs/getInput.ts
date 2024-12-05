import { readFileSync } from 'node:fs';

export function getInput(day: number, example: boolean = false): string {
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

export function getInputLineByLine(day: number, example: boolean = false): Array<string> {
    var data = getInput(day, example);
    return data.split(/\r?\n/);
}

export function processInput(callbackfn: (value: string, index: number, array: string[]) => void, day: number, example: boolean = false): void {
    var data = getInputLineByLine(day, example);
    data.forEach(callbackfn);
}

export function mapInput<T>(callbackfn: (value: string, index: number, array: string[]) => T, day: number, example: boolean = false): Array<T> {
    var data = getInputLineByLine(day, example);
    return data.map(callbackfn);
}
