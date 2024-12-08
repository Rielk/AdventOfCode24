import { error } from "console";
import { Maze } from "./Maze";
import { Graph, State } from "./State";

export class Component {
    protected readonly graph: Graph;
    protected readonly nodes: State[];
    protected baseIndex: number = 0;
    protected readonly brokenAt: number[] = [];
    protected constructor(graph: Graph, nodes: State[]) {
        this.graph = graph;
        this.nodes = nodes;
        nodes.forEach((n, i) => n.setComponent(this, i))
    }

    static createComponents(graph: Graph, initNode: State, maze: Maze): Component {
        maze.incrementMark();
        var currentPath: State[] = [];
        var nextNode = initNode;
        var nextComponent;
        while (nextNode.isEscape == false && maze.nodeVisited(nextNode) == false && (nextComponent=graph.getComponent(nextNode)) == undefined) {
            currentPath.push(nextNode);
            maze.visitNode(nextNode);
            nextNode = nextNode.nextState(maze);
        }
        if (nextNode.isEscape) {
            return new TailComponent(graph, currentPath);
        }
        else if (maze.nodeVisited(nextNode)) {
            var addNode;
            var tailNodes: State[] = [];
            while (addNode = currentPath.shift()) {
                if (nextNode.equals(addNode)) {
                    var cycle = new CycleComponent(graph, [addNode, ...currentPath]);
                    return new TailComponent(graph, tailNodes, cycle)
                }
            }
            throw error('Component seems to be an escape but wasn\'t caught');
        }
        else if (nextComponent != undefined) {
            if (nextComponent instanceof CycleComponent)
                return new TailComponent(graph, currentPath, nextComponent);
            else if (nextComponent instanceof TailComponent) {
                nextComponent.prependNodes(currentPath);
                return nextComponent;
            }
            else {
                throw error('Not possible');
            }
        }
        else {
            throw error('Not possible');
        }
    }
}

export class TailComponent extends Component {
    private readonly isEscape: boolean;
    private readonly nextComponent: Component | undefined;
    constructor(graph: Graph, nodes: State[], nextComponent?: Component) {
        super(graph, nodes);
        this.nextComponent = nextComponent
        this.isEscape = nextComponent == undefined;
    }
    
    prependNodes(newNodes: State[]) {
        this.nodes.splice(0, 0, ...newNodes);
        this.baseIndex += newNodes.length;
        newNodes.forEach((n, i) => n.setComponent(this, i));
    }
}

export class CycleComponent extends Component {

}
