const operations = [
    (x: number, y: number) => x + y,
    (x: number, y: number) => x * y
];
export class Equation {
    private _result: number;
    public get result(): number {
        return this._result;
    }
    private _inputs: number[];
    public get inputs(): number[] {
        return this._inputs;
    }
    constructor(result: number, inputs: number[]) {
        this._result = result;
        this._inputs = inputs;
    } 
    
    checkPossible(): boolean {
        return this.checkForValue(this.result, 0, 0);
    }

    private checkForValue(target: number, current: number, from: number): boolean {
        if (from >= this.inputs.length)
            return current == target;
        var value = this.inputs[from];
        if (from == 0) 
            return this.checkForValue(target, value, 1);
        for (var op of operations)
            if (this.checkForValue(target, op(current, value), from + 1))
                return true;
        return false;
    }
 }
