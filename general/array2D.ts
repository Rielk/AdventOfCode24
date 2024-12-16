import { Vector2 } from "./vector2";

export class Array2D<T> extends Array<Array<T>> {
    public get width(): number {
        return this[0].length;
    }
    public get height(): number {
        return this.length;
    }
    constructor(height: number, width: number, defaultValue?: T);
    constructor(height: number, width: number, defaultValue?: (x: number, y: number) => T);
    constructor(height: number, width: number, defaultValue?: T | ((x: number, y: number) => T)) {
        super();
        var generator: (x: number, y: number) => T;
        if (!(defaultValue instanceof Function))
            generator = (): T => defaultValue!;
        else
            generator = defaultValue;
        for (let i = 0; i < height; i++) {
            var row = new Array<T>(width);
            if (defaultValue)
                for (let j = 0; j < width; j++)
                    row[j] = (generator(j, i));
            this.push(row);
        }
    }

    public static fromArray<T>(data: Array<Array<T>>): Array2D<T> {
        return new Array2D<T>(data.length, data[0].length, (x: number, y: number) => data[y][x]);
    }

    public getValue(loc: Vector2): T | undefined {
        return this[loc.y]?.[loc.x];
    }

    public inBounds(loc: Vector2) : boolean {
        return loc.x >= 0 && loc.x < this.width && loc.y >= 0 && loc.y < this.height;
    }

    public forEach2D(callbackfn: (value: T, index: Vector2, array: Array2D<T>) => void, thisArg?: any): void {
        for (let j = 0; j < this.height; j++)
            this[j].forEach((value, i) => callbackfn(value, new Vector2(i, j), this), thisArg);   
    }

    public map2D<TR>(callbackfn: (value: T, index: Vector2, array: T[][]) => TR) {
        return new Array2D<TR>(this.height, this.width, (x, y) => callbackfn(this[y][x], new Vector2(x, y), this));
    }
}