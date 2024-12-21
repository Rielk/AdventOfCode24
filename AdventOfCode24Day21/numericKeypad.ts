import { Vector2 } from "../general/vector2";
import { ControlledKeypad } from "./keypad";

export class NumericKeypad extends ControlledKeypad {
    outputMap: Map<number, Vector2> = new Map([
        [-1, new Vector2(2, 3)],
        [0, new Vector2(1, 3)],
        [1, new Vector2(0, 2)],
        [2, new Vector2(1, 2)],
        [3, new Vector2(2, 2)],
        [4, new Vector2(0, 1)],
        [5, new Vector2(1, 1)],
        [6, new Vector2(2, 1)],
        [7, new Vector2(0, 0)],
        [8, new Vector2(1, 0)],
        [9, new Vector2(2, 0)],
    ]);
    deadSpots: readonly Vector2[] = [new Vector2(0, 3)];

    leastInputsForCode(target: number[]): number {
        let lastInput = -1;
        let count = 0;
        target.forEach(t => {
            count += this.leastInputsFor(lastInput, t);
            lastInput = t;
        });
        return count;
    }
}