import { Register } from "./register";

export const functions: ReadonlyArray<(operand: number, register: Register) => number | undefined>
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
        register.ptr = operand
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
    let den = Math.pow(2, combo(operand, register));
    return Math.floor(num / den);
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
    register.ptr += 2;
}
