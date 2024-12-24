import { process2SectionInput } from "../inputs/getInput";
import { ANDGate, IGate, ORGate, XORGate } from "./gate";
import { Wire } from "./wire";

var example = false;

var wires = new Map<string, Wire>(), gates: Array<IGate> = [];
process2SectionInput(
    line => {
        let [name, value] = line.split(': ');
        wires.set(name, new Wire(name, value));
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
            return ret;
        }
    },
    24, example);

let zWireOutput = wires.entries().reduce((total, [name, wire]) => {
    if (wire.value && name.startsWith('z')) {
        let shift = BigInt(parseInt(name.match(/\d+/)?.[0] ?? '-1'));
        total += Number(1n << shift);
    }
    return total;
}, 0);

console.log(zWireOutput);
