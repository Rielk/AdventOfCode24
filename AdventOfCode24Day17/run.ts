import { map2SectionInput } from "../inputs/getInput";
import { runProgram } from "./functions";

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

function findAForRecreate(): number {
    let currA = 0n, continueBits = 0n;
    let i = instructions.length - 1;
    while(i >= 0) {
        let newA = findBitsForith(i, currA, continueBits);
        continueBits = 0n;
        if (newA != undefined) {
            currA = newA;
            i--;
        }
        else {
            continueBits = (currA & 7n) + 1n;
            currA = currA >> 3n;
            i++;
        }
    }
    return Number(currA);

    function findBitsForith(i: number, knownBits: bigint, continueBits: bigint) : bigint | undefined {
        knownBits = knownBits << 3n;
        for (let newBits = continueBits; newBits <= 7n; newBits++) {
            let trialA = knownBits + newBits;
            let firstOutput = runProgram(instructions, { A: Number(trialA), B: initValues.B, C: initValues.C }).next().value;
            if (firstOutput == instructions[i])
                return trialA;
        }
        return undefined;
    }
}

let outs = [...runProgram(instructions, initValues)].join(',');

let initA = findAForRecreate();

console.log(`Program Output: ${outs}`);
console.log(`Minimum A to Recreate Program: ${initA}`);
