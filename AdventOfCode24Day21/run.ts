import { mapInput } from "../inputs/getInput";
import { DirectionalKeypad } from "./directionalKeypad";
import { iKeypad } from "./keypad";
import { ManualKeypad } from "./manualKepad";
import { NumericKeypad } from "./numericKeypad";

var example = false;

var targets = mapInput(line => {
    let split = line.split('');
    return split.map(c => {
        let num = parseInt(c);
        if (Number.isNaN(num))
            return -1;
        return num;
    });
}, 21, example);

function createKeypad(intermidiaries: number): NumericKeypad {
    let keypad: iKeypad = new ManualKeypad();
    for (let i = 0; i < intermidiaries; i++) {
        keypad = new DirectionalKeypad(keypad);
    }
    return new NumericKeypad(keypad);
}
function calcTotalComplexities(keypad: NumericKeypad): number {
    return targets.map(t => {
        return {
            length: keypad.leastInputsForCode(t),
            numeric: parseInt(t.filter(x => x >= 0).join(''))
        };
    }).map(o => o.length * o.numeric).reduce((x, y) => x + y);
}

let numericKeypad2 = createKeypad(2);
let numericKeypad25 = createKeypad(25);

console.log(`Total complexities with 2 directional robots: ${calcTotalComplexities(numericKeypad2)}`);
console.log(`Total complexities with 25 directional robots: ${calcTotalComplexities(numericKeypad25)}`);
