import { iNode } from "./iNode";

export function runDijkstraAlgorithm<T extends iNode<T>>(start: T, endPredicate: (testNode: T) => Boolean): { node: T; weight: number; } | undefined {
    const visited: Set<string | number> = new Set();
    const unvisited: Map<string | number, { node: T, weight: number }> = new Map();
    unvisited.set(start.uniqueId, { node: start, weight: 0 });
    let prevNodeBundle;
    while (prevNodeBundle = pickMinDistNode(unvisited)) {
        let { uid: prevUID, node: prevNode, weight: prevWeight } = prevNodeBundle;
        if (endPredicate(prevNode))
            return {
                node: prevNode,
                weight: prevWeight
            };
        visited.add(prevUID);
        unvisited.delete(prevUID);
        for (let { nextNode, addedWeight } of prevNode?.getNextNodes()) {
            let nextUID = nextNode.uniqueId;
            if (visited.has(nextUID))
                continue;
            let { weight: currBestWeight } = unvisited.get(nextUID) ?? { weight: Number.MAX_VALUE };
            let newWeight = prevWeight + addedWeight;
            if (newWeight < currBestWeight)
                unvisited.set(nextUID, { node: nextNode, weight: newWeight });
        }
    }
}

function pickMinDistNode<T extends iNode<T>>(map: Map<string | number, { node: T, weight: number }>): { uid: string | number; node: T; weight: number; } | undefined {
    let minUID, minNode, minWeight = Number.MAX_VALUE;
    for (let [uid, { weight, node }] of map.entries()) {
        if (weight < minWeight) {
            minWeight = weight;
            minNode = node;
            minUID = uid;
        }
    }
    if (minUID == undefined || minNode == undefined)
        return undefined;
    return {
        uid: minUID,
        node: minNode,
        weight: minWeight
    };
}
