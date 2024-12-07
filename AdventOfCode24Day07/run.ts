import { mapInput } from "../inputs/getInput";
import { Equation } from "./Equation";

var example = false;

var equations = mapInput(line => {
    var [resultStr, inputsStr] = line.split(': ');
    var result = parseInt(resultStr);
    var inputs = inputsStr.split(' ').map(s => parseInt(s));
    return new Equation(result, inputs);
}, 7, example);

const twoOperations = [
    (x: number, y: number) => x + y,
    (x: number, y: number) => x * y
];
const threeOperations = [
    ...twoOperations,
    (x: number, y: number) => {
        var order = Math.floor(Math.log10(y)) + 1;
        return (x * Math.pow(10, order)) + y;
    }
];

var calibrationResultWithout = equations.reduce(reduceFunc(twoOperations), 0);
var calibrationResultWith = equations.reduce(reduceFunc(threeOperations), 0);
function reduceFunc(operations: ((x: number, y: number) => number)[]): (acc: number, equ: Equation) => number {
    return (acc: number, equ: Equation) => {
        if (equ.checkPossible(operations))
            return acc + equ.result;
        return acc;
    };
}

console.log(`Total Calibration Result without Concatenation: ${calibrationResultWithout}`);
console.log(`Total Calibration Result with Concatenation: ${calibrationResultWith}`);
