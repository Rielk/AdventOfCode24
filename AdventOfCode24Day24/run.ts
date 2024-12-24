import { process2SectionInput } from "../inputs/getInput";
import { writeOutputFile } from "../outputs/setOutput";
import { ANDGate, IGate, ORGate, XORGate } from "./gate";
import { Wire } from "./wire";

var example = false;

var wires = new Map<string, Wire>(), gates: Array<IGate> = [];
var outputWires: Wire[] = [];
var inputX: Wire[] = [], inputY: Wire[] = [];
process2SectionInput(
    line => {
        let [name, value] = line.split(': ');
        let wire = new Wire(name, value);
        wires.set(name, wire);
        let index = parseInt(name.match(/\d+/)?.[0] ?? '-1');
        if (name.startsWith('x'))
            inputX[index] = wire;
        else if (name.startsWith('y'))
            inputY[index] = wire;
    },
    line => {
        let split = line.split(' ');
        let wire1 = getWire(split[0]);
        let wire2 = getWire(split[2]);
        let wireO = getWire(split[4]);
        switch (split[1]) {
            case 'XOR':
                return gates.push(new XORGate(wire1, wire2, wireO));
            case 'AND':
                return gates.push(new ANDGate(wire1, wire2, wireO));
            case 'OR':
                return gates.push(new ORGate(wire1, wire2, wireO));
            default:
                throw Error('Unrecognised Gate');
        }

        function getWire(name: string): Wire {
            let ret = wires.get(name);
            if (ret == undefined)
                wires.set(name, ret = new Wire(name));
            if (name.startsWith('z'))
                outputWires[parseInt(name.match(/\d+/)?.[0] ?? '-1')] = ret;
            return ret;
        }
    },
    24, example);

function calcWireBits(wires: Wire[]): number {
    return wires.reduce((total, wire, i) => {
        if (wire.value)
            total += Number(1n << BigInt(i));
        return total;
    }, 0);
}

function calcOutput(): number {
    return calcWireBits(outputWires);
}

function calcInputs(): { x: number, y: number } {
    return {
        x: calcWireBits(inputX),
        y: calcWireBits(inputY)
    };
}

function* generateConnections(): Generator<string> {
    //Generates the lines for an input to https://dreampuf.github.io/GraphvizOnline/
    //Load the graph and eye ball for irregularities.
    yield 'digraph G {'
    for (let i = 0; i < gates.length; i++) {
        const gate = gates[i];
        yield `    {${gate.input1.name} ${gate.input2.name}} -> ${gate.uid} -> ${gate.output.name}`;
        yield `    ${gate.uid} [label="${gate.displayName}" shape="diamond" style="filled" fillcolor="aliceblue"]`
    }
    for (let [wire] of wires) {
        let color = wire.startsWith('x') ? 'aquamarine'
            : wire.startsWith('y') ? 'cadetblue1'
                : wire.startsWith('z') ? 'darkorchid'
                    : 'gold2';
        yield `    ${wire} [style="filled" fillcolor="${color}"]`;
    }
    yield '}'
}

function doSwaps(swaps: [string, string][]) {
    for (let [output1, output2] of swaps) {
        let gate1 = gates.find(g => g.output.name == output1);
        let gate2 = gates.find(g => g.output.name == output2);
        if (gate1 == undefined || gate2 == undefined)
            throw Error('Invalid gates provided');
        gate1.swapOutput(gate2);
    }
}

let initOutput = calcOutput();
let { x, y } = calcInputs();
let expectedOutput = x + y;

writeOutputFile(generateConnections(), 24);

//Propose swaps here
let swaps: [string, string][] = [
    ['mkk', 'z10'],
    ['qbw', 'z14'],
    ['cvp', 'wjb'],
    ['wcb', 'z34']
];
doSwaps(swaps);
let newOutput = calcOutput();
const sortedAndJoinedSwaps = swaps.flat().sort((a, b) => a > b ? 1 : -1).join(',');

console.log(`Initial Output: ${initOutput}`);
console.log(`Swaps: ${sortedAndJoinedSwaps}`);
console.log(`Succesful: ${expectedOutput == newOutput}`);
