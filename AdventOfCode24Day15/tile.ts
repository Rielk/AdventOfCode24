import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";

export class Tile {
    private value: string;
    public readonly wall;
    public readonly loc: Vector2;
    public get box() {
        return this.value == 'O';
    }
    constructor(char: string, loc: Vector2) {
        this.value = char;
        this.wall = char == '#';
        this.loc = loc;
    }

    public addBox() :void {
        this.value = 'O';
    }

    public removeBox():void {
        this.value = '.';
    }

    public moveInto(moveDir: Vector2, map: Array2D<Tile>):boolean {
        if (this.wall) return false;
        if (!this.box) return true;
        let nextTile = map.getValue(this.loc.add(moveDir));
        if (nextTile == undefined)
            return false;
        if (nextTile.moveInto(moveDir, map)) {
            this.removeBox();
            nextTile.addBox();
            return true;
        }
        return false;
    }
}
