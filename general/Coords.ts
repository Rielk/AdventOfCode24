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
    
    equals(other: Vector2) : boolean {
        return this.x == other.x && this.y == other.y;
    }

    distanceTo(other: { x: number, y: number }): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    subtract(other: { x: number, y: number }): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    multiply(value: number): Vector2 {
        return new Vector2(this.x * value, this.y * value);
    }
    
    isMultipleOf(other: Vector2) : boolean {
        const xDiv = this.x / other.x;
        const yDiv = this.y / other.y;
        return xDiv == Math.floor(xDiv) &&  yDiv == Math.floor(yDiv) && xDiv == yDiv;
    }
}