import { Vector2 } from "../general/vector2";

export interface iKeypad {
    leastInputsFor(from: number, to: number): number;
}

export abstract class ControlledKeypad implements iKeypad {
    private controller: iKeypad;

    abstract outputMap: Map<number, Vector2>;
    abstract deadSpots: readonly Vector2[];

    constructor(controller: iKeypad) {
        this.controller = controller;
    }

    private cache: Map<number, Map<number, number>> = new Map();
    leastInputsFor(from: number, to: number): number {
        let fromCache = this.cache.get(from);
        const cachedValue = fromCache?.get(to);
        if (cachedValue != undefined)
            return cachedValue;

        let fromLoc = this.outputMap.get(from), toLoc = this.outputMap.get(to);
        if (fromLoc == undefined || toLoc == undefined)
            return NaN;
        if (fromLoc.equals(toLoc))
            return 1;
        let distance = toLoc.subtract(fromLoc);
        let pathLengths = [];
        let hDir = distance.x > 0 ? 0 : 2;
        let vDir = distance.y > 0 ? 1 : 3;
        // Horizontal First:
        if (distance.x != 0 && !this.deadSpots.some(ds =>
            (ds.x == toLoc.x
                && ds.y <= Math.max(fromLoc.y, toLoc.y)
                && ds.y >= Math.min(fromLoc.y, toLoc.y))
            ||
            (ds.y == fromLoc.y
                && ds.x <= Math.max(fromLoc.x, toLoc.x)
                && ds.x >= Math.min(fromLoc.x, toLoc.x))
        )) {
            let d = this.controller.leastInputsFor(-1, hDir);
            d += Math.abs(distance.x) - 1;
            let lastDir = hDir;
            if (distance.y != 0) {
                d += this.controller.leastInputsFor(hDir, vDir);
                d += Math.abs(distance.y) - 1;
                lastDir = vDir;
            }
            d += this.controller.leastInputsFor(lastDir, -1);
            pathLengths.push(d);
        }
        // Vertical First:
        if (distance.y != 0 && !this.deadSpots.some(ds =>
            (ds.y == toLoc.y
                && ds.x <= Math.max(fromLoc.x, toLoc.x)
                && ds.x >= Math.min(fromLoc.x, toLoc.x))
            ||
            (ds.x == fromLoc.x
                && ds.y <= Math.max(fromLoc.y, toLoc.y)
                && ds.y >= Math.min(fromLoc.y, toLoc.y))
        )) {
            let d = this.controller.leastInputsFor(-1, vDir);
            d += Math.abs(distance.y) - 1;
            let lastDir = vDir;
            if (distance.x != 0) {
                d += this.controller.leastInputsFor(vDir, hDir);
                d += Math.abs(distance.x) - 1;
                lastDir = hDir;
            }
            d += this.controller.leastInputsFor(lastDir, -1);
            pathLengths.push(d);
        }

        let leastInputs = Math.min(...pathLengths);
        if (fromCache == undefined)
            this.cache.set(from, fromCache = new Map());
        fromCache.set(to, leastInputs);
        return leastInputs;
    }
}