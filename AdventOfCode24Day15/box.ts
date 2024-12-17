import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { Tile } from "./tile";

export class Box {
    private locations: Vector2[] = [];
    public get gpsCoords() {
        let pos = this.locations[0];
        return (100 * pos.y + pos.x) / this.locations.length;
    }
    constructor(width: number, leftLoc: Vector2) {
        for (let i = 0; i < width; i++)
            this.locations.push(leftLoc.add({ x: i, y: 0 }));
    }

    public init(map: Array2D<Tile>) : void {
        this.locations.forEach(l => map.getValue(l)?.addBox(this));
    }

    public forceMove(moveDir: Vector2, map: Array2D<Tile>): void {
        this.locations.map(l => map.getValue(l))
            .forEach(t => t?.removeBox());
        this.locations = this.locations.map(l => l.add(moveDir));
        this.locations.map(l => map.getValue(l))
            .forEach(t => {
                t?.box?.forceMove(moveDir, map);
                t?.addBox(this);
            });
    }

    public canMove(moveDir: Vector2, map: Array2D<Tile>): boolean {
        return this.locations.map(l => l.add(moveDir))
            .map(l => map.getValue(l))
            .filter(t => t != undefined && t?.box != this)
            .every(tile => tile?.canMoveInto(moveDir, map));
    }
}