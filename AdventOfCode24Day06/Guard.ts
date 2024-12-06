export class Guard {
    private start_x: number;
    private start_y: number;
    private x: number;
    private y: number;
    private dir_index = 0;
    public get dir(): [number, number] {
        return Guard.directions[this.dir_index];
    }
    private static directions: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    constructor(x: number, y: number) {
        this.start_x = this.x = x;
        this.start_y = this.y = y;
    }

    public walk(map: boolean[][]): {visited: boolean[][], loop: boolean} {
        this.reset();
        var visited : number[][][] = map.map(row => row.map(() => []));
        markVisited(this.start_x, this.start_y, this.dir_index);
        var moved, newLocation, loop = false;
        while (({ moved, newLocation } = this.step(map)).cont) {
            if (moved){
                if (loop = isVisitied(newLocation.x, newLocation.y, this.dir_index))
                    break;
                markVisited(newLocation.x, newLocation.y, this.dir_index)
            }
        }
        return {visited: visited.map(row => row.map(col => col.length > 0)), loop: loop};

        function isVisitied (x: number, y: number, direction: number) {
            return visited[y][x].includes(direction);
        }

        function markVisited(x: number, y: number, direction: number) {
            visited[y][x].push(direction);
        }
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

    private reset() {
        this.x = this.start_x;
        this.y = this.start_y;
        this.dir_index = 0;
    }

    private change_dir() {
        this.dir_index = (this.dir_index + 1) % 4;
    }
    private get_next_loc(): { x: number, y: number } {
        var dir = this.dir;
        return { x: this.x + dir[0], y: this.y + dir[1] };
    }
}

if (require.main === module)
    require("./run");
