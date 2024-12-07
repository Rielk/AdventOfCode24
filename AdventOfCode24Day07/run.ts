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
    (x: number, y : number) => {
        var order = Math.floor(Math.log10(y)) + 1;
        var mult = Math.pow(10, order);
        return (x*mult)+y;
    }
]

var calibrationResultWithout = equations.reduce((val, equ) => {
    if (equ.checkPossible(twoOperations))
        return val + equ.result;
    return val;
}, 0);
var calibrationResultWith = equations.reduce((val, equ) => {
    if (equ.checkPossible(threeOperations))
        return val + equ.result;
    return val;
}, 0);

console.log(`Total Calibration Result without Concatenation: ${calibrationResultWithout}`);
console.log(`Total Calibration Result with Concatenation: ${calibrationResultWith}`);
