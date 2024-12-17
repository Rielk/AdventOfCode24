import { iNode } from "./iNode";

export function runDijkstraAlgorithm<T extends iNode<T>>
    (start: T, endPredicate: (testNode: T) => Boolean): {
        weight: number,
        visitedNodes: Map<string | number, { node: T; weight: number; }>,
        finalNode: T
    } | undefined {

    const visited: Map<string | number, { node: T, weight: number }> = new Map();
    const unvisited: Map<string | number, { node: T, weight: number, prevNodes: T[] }> = new Map();
    unvisited.set(start.uniqueId, { node: start, weight: 0, prevNodes: [] });

    let nodeKeyValue;
    while (nodeKeyValue = pickMinDistNode(unvisited)) {
        let { uid, value: {node, weight, prevNodes} } = nodeKeyValue;
        visited.set(uid, { node: node, weight: weight });
        node.finalise(weight, prevNodes);
        if (endPredicate(node))
            return {
                weight: weight,
                visitedNodes: visited,
                finalNode: node
            };
        unvisited.delete(uid);

        for (let { nextNode, addedWeight } of node?.getNextNodes()) {
            let nextUID = nextNode.uniqueId;
            if (visited.has(nextUID))
                continue;
            let { weight: currBestWeight, prevNodes: currPrevNodes } = unvisited.get(nextUID) ?? { weight: Number.MAX_VALUE };
            let newWeight = weight + addedWeight;
            if (newWeight < currBestWeight)
                unvisited.set(nextUID, { node: nextNode, weight: newWeight, prevNodes: [node] });
            else if (newWeight == currBestWeight)
                currPrevNodes?.push(node);
        }
    }
}

function pickMinDistNode<T extends iNode<T>, TValue extends {weight: number}>(map: Map<string | number, TValue>): { uid: string | number; value: TValue; } | undefined {
    let minUID, minValue, minWeight = Number.MAX_VALUE;
    for (let [uid, value] of map.entries()) {
        if (value.weight < minWeight) {
            minWeight = value.weight;
            minValue = value;
            minUID = uid;
        }
    }
    if (minUID == undefined || minValue == undefined)
        return undefined;
    return {
        uid: minUID,
        value: minValue
    };
}
