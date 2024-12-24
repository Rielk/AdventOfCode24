import { Wire } from "./wire";

export interface IGate {

}

abstract class BaseGate implements IGate {
    readonly input1: Wire;
    readonly input2: Wire;
    readonly output: Wire;
    constructor(input1: Wire, input2: Wire, output: Wire) {
        this.input1 = input1;
        this.input2 = input2;
        this.output = output;
        if (!this.updateOutput()) {
            this.input1.waitForUpdate(() => this.updateOutput());
            this.input2.waitForUpdate(() => this.updateOutput());
        }
    }
    updateOutput(): boolean {
        let i1 = this.input1.value, i2 = this.input2.value
        if (i1 == undefined || i2 == undefined)
            return false;
        this.output.set(this.logic(i1, i2));
        return true;
    }

    abstract logic(i1: boolean, i2: boolean): boolean;
}

export class XORGate extends BaseGate {
    logic(i1: boolean, i2: boolean): boolean {
        return i1 != i2;
    }
}

export class ANDGate extends BaseGate {
    logic(i1: boolean, i2: boolean): boolean {
        return i1 && i2;
    }
}
export class ORGate extends BaseGate {
    logic(i1: boolean, i2: boolean): boolean {
        return i1 || i2;
    }
}
