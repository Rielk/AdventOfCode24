export class Guard {
    private start_x: number;
    private start_y: number;
    private x: number;
    private y: number;
    private dir_index = 0;
    private visited : number [][][] = []
    private mapHeight: number = 0;
    private mapWidth: number = 0;
    public get dir(): [number, number] {
        return Guard.directions[this.dir_index];
    }
    private static directions: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    constructor(x: number, y: number) {
        this.start_x = this.x = x;
        this.start_y = this.y = y;
    }

    public walk(map: boolean[][]): boolean[][] {
        this.doWalk(map);
        return this.visited.map(row => row.map(col => col.length > 0));
    }

    public checkForLoop(map: boolean[][]) : boolean {
        return this.doWalk(map);
    }

    private doWalk(map: boolean[][]): boolean {
        this.reset(map);
        this.markVisited(this.start_x, this.start_y, this.dir_index);
        var moved, newLocation;
        while (({ moved, newLocation } = this.step(map)).cont) {
            if (moved){
                if (this.isVisitied(newLocation.x, newLocation.y, this.dir_index))
                    return true;
                this.markVisited(newLocation.x, newLocation.y, this.dir_index)
            }
        }
        return false;
    }

    private isVisitied (x: number, y: number, direction: number) {
        return this.visited[y][x].includes(direction);
    }

    private markVisited(x: number, y: number, direction: number) {
        this.visited[y][x].push(direction);
    }

    private step(map: boolean[][]): { cont: boolean, moved: boolean, newLocation: { x: number, y: number } } {
        var { x: nextX, y: nextY } = this.get_next_loc();
        if (map[nextY]?.[nextX] == undefined)
            return { cont: false, moved: true, newLocation: { x: nextX, y: nextY } };
        var move = !map[nextY][nextX];
        if (move) {
            this.x = nextX;
            this.y = nextY;
        }
        else
            this.change_dir();
        return { cont: true, moved: move, newLocation: { x: this.x, y: this.y } };
    }

    private reset(map: boolean[][]) {
        this.x = this.start_x;
        this.y = this.start_y;
        this.dir_index = 0;
        if (this.mapHeight != map.length || this.mapWidth != map[0].length) {
            this.mapHeight = map.length
            this.mapWidth = map[0].length;
            this.visited = []
            for (let j = 0; j < this.mapHeight; j++) {
                var row: number[][] = [];
                this.visited.push(row);
                for (let i = 0; i < this.mapWidth; i++) 
                    row.push([]);
            }
        }
        else {
            this.visited.forEach(row => {
                for (let i = 0; i < row.length; i++)
                    row[i] = [];
            })
        }
    }

    private change_dir() {
        this.dir_index = (this.dir_index + 1) % 4;
    }
    private get_next_loc(): { x: number, y: number } {
        var dir = this.dir;
        return { x: this.x + dir[0], y: this.y + dir[1] };
    }
}
