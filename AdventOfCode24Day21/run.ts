import { mapInput } from "../inputs/getInput";
import { DirectionalKeypad } from "./directionalKeypad";
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

let numericKeypad = new NumericKeypad(new DirectionalKeypad(new DirectionalKeypad(new ManualKeypad())));

let complexities = targets.map(t => {
    return {
        length: numericKeypad.leastInputsForCode(t),
        numeric: parseInt(t.filter(x => x >= 0).join(''))
    };
}).map(o => o.length * o.numeric);

console.log(complexities.reduce((x, y) => x + y));
