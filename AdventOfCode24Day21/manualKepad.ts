import { iKeypad } from "./keypad";

export class ManualKeypad implements iKeypad {
    leastInputsFor(): number {
        return 1;
    }
}