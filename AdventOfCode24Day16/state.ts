import { Array2D } from "../general/array2D";
import { CantorNegtivePairing, CantorPairing } from "../general/CantorPairing";
import { iNode } from "../general/Dijkstra/iNode";
import { Vector2 } from "../general/vector2";

export class State implements iNode<State> {
    public readonly loc: Vector2;
    public readonly dir: number;
    public readonly uniqueId: number;
    private readonly maze: Array2D<boolean>;
    constructor(loc: Vector2, dir: number, maze: Array2D<boolean>) {
        this.loc = loc;
        this.dir = dir;
        this.uniqueId = CantorPairing(dir, CantorNegtivePairing(loc.x, loc.y));
        this.maze = maze;
    }
    *getNextNodes(): Generator<{ nextNode: State; addedWeight: number; }> {
        let stepLoc = this.loc.moveDirection(this.dir);
        if (this.maze.getValue(stepLoc))
            yield {
                nextNode: new State(stepLoc, this.dir, this.maze),
                addedWeight: 1
            };
        yield {
            nextNode: new State(this.loc, (this.dir + 1) % 4, this.maze),
            addedWeight: 1000
        };
        yield {
            nextNode: new State(this.loc, (this.dir + 3) % 4, this.maze),
            addedWeight: 1000
        };
    }
}