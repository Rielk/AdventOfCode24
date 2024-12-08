import { State } from "./State";

export class MazeTile {
     private readonly _wall: boolean;
     public get wall(): boolean {
          return this._wall;
     }
     private _mark: number | undefined = undefined;
     public get mark(): number | undefined {
          return this._mark;
     }
     private readonly visited: number[] = [-1, -1, -1, -1];
     constructor(wall: boolean) {
          this._wall = wall;
     }
     visit(dir: number, mark: number) {
          this.visited[dir] = mark;
     }
}

export class Maze {
     private _mark: number = 0;
     public get mark(): number {
          return this._mark;
     }
     private set mark(value: number) {
          this._mark = value;
     }
     private readonly tiles : MazeTile[][] = [];
     public readonly height: number;
     public readonly width: number;
     constructor(map: boolean[][]) {
          this.height = map.length;
          this.width = map[0].length;
          var newRow;
          for (let j = 0; j < this.height; j++) {
               this.tiles.push(newRow = []);
               for (let i = 0; i < this.width; i++)
                    newRow.push(new MazeTile(map[j][i]));
          }
     }

     get(nextNode: State): MazeTile | undefined {
          return this.tiles[nextNode.j]?.[nextNode.i];
     }
     getTile(x: number, y: number): MazeTile | undefined {
          return this.tiles[y]?.[x];
      }
     incrementMark() {
          return ++this.mark;
     }
     nodeVisited(node: State) : boolean {
         return this.get(node)?.mark == this.mark;
     }
     visitNode(node: State) {
          return this.get(node)?.visit(node.d, this.mark);
      }
}