import { map2SectionInput } from "../inputs/getInput";
import { functions, runProgram } from "./functions";

var example = false;

var { data1: initValues, data2: instructions } = map2SectionInput(
    line => parseInt(line.split(': ')[1]),
    mid => ({
        A: mid[0],
        B: mid[1],
        C: mid[2]
    }),
    line => line.split(': ')[1],
    mid => mid[0].split(',').map(c => parseInt(c)),
    17, example);

let outs = runProgram(instructions, initValues);

console.log(outs.join(','));
