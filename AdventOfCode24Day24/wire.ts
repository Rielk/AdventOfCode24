export class Wire {
    private _value: boolean | undefined;
    public get value(): boolean | undefined {
        return this._value;
    }
    private set value(value: boolean | undefined) {
        this._value = value;
    }
    public readonly name: string;
    private readonly waitingForUpdate: Array<() => void> = [];

    constructor(name: string, value?: string) {
        if (!(value == '0' || value == '1' || value == undefined))
            throw Error('Invalid input');
        this.value = value == '0' ? false : (value == '1' ? true : undefined);
        this.name = name;
    }

    set(value: boolean): void {
        this.value = value;
        this.waitingForUpdate.forEach(callback => callback());
    }

    onUpdate(callback: () => void): void {
        this.waitingForUpdate.push(callback);
    }
}