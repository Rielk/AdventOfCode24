import { Register } from "./register";

const functions: ReadonlyArray<(operand: number, register: Register) => number | undefined>
    = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

function adv(operand: number, register: Register): undefined {
    register.A = xdv(operand, register);
}

function bxl(operand: number, register: Register): undefined {
    register.B = Number(BigInt(register.B) ^ BigInt(operand));
}

function bst(operand: number, register: Register): undefined {
    register.B = combo(operand, register) % 8;
}

function jnz(operand: number, register: Register): undefined {
    if (register.A != 0)
        register.pointer = operand
}

function bxc(_: number, register: Register): undefined {
    register.B = Number(BigInt(register.B) ^ BigInt(register.C));
}

function out(operand: number, register: Register): number {
    return combo(operand, register) % 8;
}

function bdv(operand: number, register: Register): undefined {
    register.B = xdv(operand, register);
}

function cdv(operand: number, register: Register): undefined {
    register.C = xdv(operand, register);
}

function xdv(operand: number, register: Register): number {
    let num = BigInt(register.A);
    let den = BigInt(combo(operand, register));
    return Number(num >> den);
}

function combo(value: number, register: Register): number {
    switch (value) {
        case 0:
        case 1:
        case 2:
        case 3:
            return value;
        case 4:
            return register.A;
        case 5:
            return register.B;
        case 6:
            return register.C;
        default:
            throw Error('Impossible operand passed as combo');
    }
}

export function* runProgram(instructions: number[], initValues: { A: number, B: number, C: number }): Generator<number> {
    let registry = {
        A: initValues.A,
        B: initValues.B,
        C: initValues.C,
        pointer: 0
    }
    while (registry.pointer < instructions.length) {
        const func = functions[instructions[registry.pointer++]];
        let ret = func(instructions[registry.pointer++], registry);
        if (ret != undefined)
            yield ret;
    }
}
