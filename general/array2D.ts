import { Vector2 } from "./vector2";

export class Array2D<T> extends Array<Array<T>> {
    public get width(): number {
        return this[0].length;
    }
    public get height(): number {
        return this.length;
    }
    constructor(len1: number, len2: number, defaultValue?: T);
    constructor(len1: number, len2: number, defaultValue?: (x: number, y: number) => T);
    constructor(len1: number, len2: number, defaultValue?: T | ((x: number, y: number) => T)) {
        super();
        var generator: (x: number, y: number) => T;
        if (!(defaultValue instanceof Function))
            generator = (): T => defaultValue!;
        else
            generator = defaultValue;
        for (let i = 0; i < len1; i++) {
            var row = new Array<T>(len2);
            if (defaultValue)
                for (let j = 0; j < len2; j++)
                    row[j] = (generator(j, i));
            this.push(row);
        }
    }

    public getValue(loc: Vector2): T | undefined {
        return this[loc.y]?.[loc.x];
    }

    public inBounds(loc: Vector2) : boolean {
        return loc.x >= 0 && loc.x < this.width && loc.y >= 0 && loc.y < this.height;
    }

    public forEach2D(callbackfn: (value: T, index: {x: number, y: number}, array: Array2D<T>) => void, thisArg?: any): void {
        for (let j = 0; j < this.height; j++)
            this[j].forEach((value, i) => callbackfn(value, {x: i, y: j}, this), thisArg);   
    }
}