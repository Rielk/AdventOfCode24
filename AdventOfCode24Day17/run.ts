import { map2SectionInput } from "../inputs/getInput";
import { functions } from "./functions";

var example = false;

var { data1: rgt, data2: instructions } = map2SectionInput(
    line => parseInt(line.split(': ')[1]),
    mid => ({
        A: mid[0],
        B: mid[1],
        C: mid[2],
        ptr: 0
    }),
    line => line.split(': ')[1],
    mid => mid[0].split(',').map(c => parseInt(c)),
    17, example);

const outs = [];
while (rgt.ptr < instructions.length) {
    let ret = functions[instructions[rgt.ptr]](instructions[rgt.ptr + 1], rgt);
    if (ret != undefined)
        outs.push(ret);
}

console.log(outs.join(','));
