import { mapInput } from "../inputs/getInput";
import { Maze } from "./Maze";
import { Graph, State } from "./State";

var example = false;

var startState : State;
var map = mapInput(function (line, y) {
    var split = line.split('');
    for (let x = 0; x < split.length; x++) {
        if (split[x] == '^')
            startState = new State(x, y, 0);
    }
    return split.map(c => c == '#');
}, 6, example)
var maze = new Maze(map);
var graph = new Graph(maze);

console.log(`Positions visited by guard; ${4665}`);
console.log(`Positions which cause a loop: ${1688}`);
