import { mapInput } from "../inputs/getInput";
import { Equation } from "./Equation";

var example = false;

var equations = mapInput(line => {
    var [resultStr, inputsStr] = line.split(': ');
    var result = parseInt(resultStr);
    var inputs = inputsStr.split(' ').map(s => parseInt(s));
    return new Equation(result, inputs);
}, 7, example);

var calibrationResult = equations.reduce((val, equ) => {
    if (equ.checkPossible())
        return val + equ.result;
    return val;
}, 0);

console.log(`Total Calibration Result: ${calibrationResult}`);
