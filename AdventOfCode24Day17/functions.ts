import { Register } from "./register";

const functions: ReadonlyArray<(operand: number, register: Register) => number | undefined>
    = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

function adv(operand: number, register: Register): undefined {
    register.A = xdv(operand, register);
    step(register);
}

function bxl(operand: number, register: Register): undefined {
    register.B ^= operand;
    step(register);
}

function bst(operand: number, register: Register): undefined {
    register.B = combo(operand, register) % 8;
    step(register);
}

function jnz(operand: number, register: Register): undefined {
    if (register.A == 0)
        step(register);
    else
        register.pointer = operand
}

function bxc(_: number, register: Register): undefined {
    register.B ^= register.C;
    step(register);
}

function out(operand: number, register: Register): number {
    step(register);
    return combo(operand, register) % 8;
}

function bdv(operand: number, register: Register): undefined {
    register.B = xdv(operand, register);
    step(register);
}

function cdv(operand: number, register: Register): undefined {
    register.C = xdv(operand, register);
    step(register);
}

function xdv(operand: number, register: Register): number {
    let num = register.A;
    let den = combo(operand, register);
    return num >> den;
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

function step(register: Register) {
    register.pointer += 2;
}

export function runProgram(instructions: number[], initValues: { A: number, B: number, C: number }): number[] {
    const outs = [];
    let registry = {
        A: initValues.A,
        B: initValues.B,
        C: initValues.C,
        pointer: 0
    }
    while (registry.pointer < instructions.length) {
        const func = functions[instructions[registry.pointer]];
        let ret = func(instructions[registry.pointer + 1], registry);
        if (ret != undefined)
            outs.push(ret);
    }
    return outs;
}
