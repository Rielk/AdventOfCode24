abstract class LockAndKey {
    readonly heights: readonly number[];
    constructor(heights: number[]) {
        this.heights = heights;
    }
}

export class Lock extends LockAndKey {
}

export class Key extends LockAndKey {
    fits(lock: Lock): boolean {
        for (let i = 0; i < this.heights.length; i++) {
            if (this.heights[i] + lock.heights[i] > 5)
                return false;
        }
        return true;
    }
}
