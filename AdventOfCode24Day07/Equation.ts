export class Equation {
    private _result: number;
    public get result(): number {
        return this._result;
    }
    private inputs: number[];
    constructor(result: number, inputs: number[]) {
        this._result = result;
        this.inputs = inputs;
    }

    checkPossible(operations: ((x: number, y: number) => number)[]): boolean {
        return this.checkForValue(this.result, operations, this.inputs[0], 1);
    }

    private checkForValue(target: number, operations: ((x: number, y: number) => number)[], current: number, from: number): boolean {
        if (from >= this.inputs.length)
            return current == target;
        var value = this.inputs[from];
        for (var op of operations)
            if (this.checkForValue(target, operations, op(current, value), from + 1))
                return true;
        return false;
    }
}
