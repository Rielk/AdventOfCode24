import { Component } from "./Component";
import { Maze } from "./Maze";

export class Graph {
    private readonly states : State[][][] = [];
    constructor(maze : Maze) {
        var newRow, newCol;
        for (let j = 0; j < maze.height; j++) {
            this.states.push(newRow = []);
            for (let i = 0; i < maze.width; i++) {
                newRow.push(newCol = []);
                for (let d = 0; d < 4; d++) {
                    newCol.push(new State(i, j, d));
                }
            }
        }
        this.states.forEach((row) => row.forEach(col => col.forEach(dir => dir.startComponentCreation(this, maze))));
    }
    getComponent(node: State) : Component | undefined {
        if (node.isEscape)
            return undefined;
        return this.states[node.i][node.j][node.d].component;
    }

}

export class State {
    public readonly i: number;
    public readonly j: number;
    public readonly d: number;
    public readonly isEscape: boolean = false;

    private _component: Component | undefined;
    public get component() {
        return this._component;
    }
    private componentPosition: number | undefined;

    private static directions: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    constructor(i: number, j: number, d: number) {
        this.i = i;
        this.j = j;
        this.d = d % 4;
    }

    startComponentCreation(graph: Graph, maze: Maze) {
        if (this.component != undefined)
            return;
        Component.createComponents(graph, this, maze);
    }
    
    setComponent(component: Component, position: number): void {
        this._component = component;
        this.componentPosition = position;
    }

    nextState(maze: Maze): State {
        var dir = State.directions[this.d];
        var x = this.i + dir[0];
        var y = this.j + dir[1];
        const mazeVal = maze.getTile(x,y)?.wall;
        if (mazeVal == undefined)
            return escapeState;
        else if (mazeVal)
            return new State(this.i, this.j, this.d + 1);
        else
            return new State(x, y, this.d);
    }

    equals(other: State) {
        if (this.i != other.i)
            return false;
        if (this.j != other.j)
            return false;
        if (this.d != other.d)
            return false;
        if (this.isEscape != other.isEscape)
            return false;
        return true;
    }

}


class EscapeState extends State {
    public readonly isEscape: boolean = true;
    constructor() {
        super(-1, -1, -1);
    }
}
export const escapeState = new EscapeState();
