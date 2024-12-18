import { Array2D } from "../general/array2D";
import { iNode } from "../general/Dijkstra/iNode";
import { Vector2 } from "../general/vector2";

export class State implements iNode<State> {
    public uniqueId: number;
    public readonly loc: Vector2;
    public byteLocations: Array2D<boolean>;

    constructor(loc: Vector2, byteLocations: Array2D<boolean>) {
        this.loc = loc;
        this.uniqueId = loc.cantorPair();
        this.byteLocations = byteLocations;
    }

    *getNextNodes(): Generator<{ nextNode: State; addedWeight: number; }> {
        for (let adj of this.loc.adjacent()) {
            if (this.byteLocations.getValue(adj) == false)
                yield {
                    nextNode: new State(adj, this.byteLocations),
                    addedWeight: 1
                }
        }
    }
    finalise(weight: number, prevNodes: State[]): void {}

}