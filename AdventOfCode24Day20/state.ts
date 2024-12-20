import { Vector2 } from "../general/vector2";

export class State {
    public readonly location : Vector2;
    public readonly distance : number;

    constructor(location: Vector2, distance: number) {
        this.location = location;
        this.distance = distance;
    }
}