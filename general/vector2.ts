import { CantorNegtivePairing } from "./CantorPairing";

export class Vector2 {
    private readonly _x: number;
    public get x(): number {
        return this._x;
    }
    private readonly _y: number;
    public get y(): number {
        return this._y;
    }

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    equals(other: Vector2): boolean {
        return this.x == other.x && this.y == other.y;
    }

    distanceTo(other: { x: number, y: number }): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    add(other: { x: number, y: number }): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtract(other: { x: number, y: number }): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    multiply(value: number): Vector2 {
        return new Vector2(this.x * value, this.y * value);
    }
    divide(value: number) {
        return new Vector2(this.x / value, this.y / value);
    }

    isMultipleOf(other: Vector2): boolean {
        const xDiv = this.x / other.x;
        const yDiv = this.y / other.y;
        return xDiv == Math.floor(xDiv) && yDiv == Math.floor(yDiv) && xDiv == yDiv;
    }

    private static directions = [new Vector2(1, 0), new Vector2(0, 1), new Vector2(-1, 0), new Vector2(0, -1)];
    public *adjacent(): Generator<Vector2> {
        for (var dir of Vector2.directions)
            yield this.add(dir);
    }
    public moveDirection(dir: number, n?: number) {
        let change = Vector2.directions[dir];
        if (n != undefined)
            change = change.multiply(n);
        return this.add(change)
    }
    public *withinDistance(distance: number): Generator<Vector2> {
        for (let dy = -distance; dy <= distance; dy++) {
            let xRange = distance - Math.abs(dy);
            let y = this.y + dy;
            for (let dx = -xRange; dx <= xRange; dx++) {
                let x = this.x + dx;
                yield new Vector2(x, y);
            }

        }
    }

    constrainWrap(bounds: { x: number; y: number; }): Vector2 {
        let newX = this.x % bounds.x;
        if (newX < 0)
            newX += bounds.x;
        let newY = this.y % bounds.y;
        if (newY < 0)
            newY += bounds.y;
        return new Vector2(newX, newY);
    }

    cantorPair(): number {
        return CantorNegtivePairing(this.x, this.y);
    }
}