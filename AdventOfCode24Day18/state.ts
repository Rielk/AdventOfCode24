import { Array2D } from "../general/array2D";
import { iNode } from "../general/Dijkstra/iNode";
import { Vector2 } from "../general/vector2";

export class Node implements iNode<Node> {
    public uniqueId: number;
    public readonly loc: Vector2;
    public byteLocations: Array2D<boolean>;
    private prevNodes: Node[] | undefined;

    constructor(loc: Vector2, byteLocations: Array2D<boolean>) {
        this.loc = loc;
        this.uniqueId = loc.cantorPair();
        this.byteLocations = byteLocations;
    }

    *getNextNodes(): Generator<{ nextNode: Node; addedWeight: number; }> {
        for (let adj of this.loc.adjacent()) {
            if (this.byteLocations.getValue(adj) == false)
                yield {
                    nextNode: new Node(adj, this.byteLocations),
                    addedWeight: 1
                }
        }
    }
    finalise(weight: number, prevNodes: Node[]): void {
        this.prevNodes = prevNodes;
    }

    removeNodeFromPrevious(predicate: (node:Node) => boolean) : boolean {
        if (this.prevNodes == undefined)
            return true;
        let index = this.prevNodes.findIndex(predicate);
        if (index >= 0)
            this.prevNodes.splice(index, 1);
        for (let i = 0; i < this.prevNodes.length; i++) {
            if (this.prevNodes[i].removeNodeFromPrevious(predicate)) {
                this.prevNodes.splice(i, 1);
                i--;
            }
        }
        return this.prevNodes.length <= 0;
    }
}