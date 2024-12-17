import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { Box } from "./box";

export class Tile {
    public readonly startingValue: string;
    public readonly wall;
    public readonly loc: Vector2;
    private _box: Box | undefined;
    public get box(): Box | undefined {
        return this._box;
    }
    private set box(value: Box | undefined) {
        this._box = value;
    }
    constructor(char: string, loc: Vector2) {
        this.startingValue = char;
        this.wall = char == '#';
        this.box = char == 'O' ? new Box(1, loc) : undefined;
        this.loc = loc;
    }

    public addBox(box: Box): void {
        this.box = box;
    }

    public removeBox(): void {
        this.box = undefined;
    }

    public moveInto(moveDir: Vector2, map: Array2D<Tile>): boolean {
        if (!this.canMoveInto(moveDir, map))
            return false;
        this.box?.forceMove(moveDir, map);
        return true;
    }

    public canMoveInto(moveDir: Vector2, map: Array2D<Tile>): boolean {
        if (this.wall) return false;
        if (this.box)
            return this.box.canMove(moveDir, map);
        return true;
    }
}
