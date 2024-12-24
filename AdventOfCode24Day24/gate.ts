import { Wire } from "./wire";

export interface IGate {
    readonly input1: Wire;
    readonly input2: Wire;
    readonly output: Wire;

    readonly uid: string;
    readonly displayName: string;

    swapOutput(other: IGate): void;
}

abstract class BaseGate implements IGate {
    readonly input1: Wire;
    readonly input2: Wire;
    private _output: Wire;
    public get output(): Wire {
        return this._output;
    }
    private set output(value: Wire) {
        this._output = value;
    }

    readonly uid: string;
    get displayName(): string {
        return this.getLogicName();
    }

    constructor(input1: Wire, input2: Wire, output: Wire) {
        this.input1 = input1;
        this.input2 = input2;
        this._output = output;
        this.input1.onUpdate(() => this.updateOutput());
        this.input2.onUpdate(() => this.updateOutput());
        this.updateOutput()
        this.uid = `${input1.name}_${this.getLogicName()}_${input2.name}`;
    }

    private updateOutput(): boolean {
        let i1 = this.input1.value, i2 = this.input2.value
        if (i1 == undefined || i2 == undefined)
            return false;
        this.output.set(this.logic(i1, i2));
        return true;
    }

    swapOutput(other: BaseGate): void {
        [this.output, other.output] = [other.output, this.output];
        this.updateOutput();
        other.updateOutput();
    }

    abstract logic(i1: boolean, i2: boolean): boolean;
    abstract getLogicName(): string;
}

export class XORGate extends BaseGate {
    getLogicName(): string {
        return 'XOR';
    }
    logic(i1: boolean, i2: boolean): boolean {
        return i1 != i2;
    }
}

export class ANDGate extends BaseGate {
    getLogicName(): string {
        return 'AND';
    }
    logic(i1: boolean, i2: boolean): boolean {
        return i1 && i2;
    }
}
export class ORGate extends BaseGate {
    getLogicName(): string {
        return 'OR';
    }
    logic(i1: boolean, i2: boolean): boolean {
        return i1 || i2;
    }
}
