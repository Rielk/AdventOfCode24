import { Vector2 } from "../general/vector2";
import { ControlledKeypad } from "./keypad";

export class DirectionalKeypad extends ControlledKeypad {
    outputMap: Map<number, Vector2> = new Map([
        [-1, new Vector2(2, 0)],
        [0, new Vector2(2, 1)],
        [1, new Vector2(1, 1)],
        [2, new Vector2(0, 1)],
        [3, new Vector2(1, 0)],

    ]);
    deadSpots: readonly Vector2[] = [new Vector2(0, 0)];
}