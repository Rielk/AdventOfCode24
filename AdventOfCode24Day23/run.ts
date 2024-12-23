import { processInput } from "../inputs/getInput";

var example = false;

var connections = new Map<string, Set<string>>();
processInput(line => {
    let [a, b] = line.split('-');
    safeAdd(a, b);
    safeAdd(b, a);

    function safeAdd(k: string, v: string) {
        let set = connections.get(k);
        if (set == undefined)
            connections.set(k, set = new Set());
        set.add(v);
    }
}, 23, example);

function find3Networks() {
    let networks: { 1: string, 2: string, 3: string }[] = [];
    for (let [computer1, connections1] of connections.entries()) {
        for (let computer2 of connections1) {
            let connections2 = connections.get(computer2) ?? new Set();
            let jointConnections = connections1.intersection(connections2);
            for (let computer3 of jointConnections)
                if (computer1 > computer2 && computer2 > computer3)
                    networks.push({ 1: computer1, 2: computer2, 3: computer3 });
        }
    }
    return networks;
}

function findLargestNetwork(): Set<string> {
    let maximalSets = BronKerbosch1(new Set(), new Set(connections.keys()), new Set());
    return maximalSets.reduce((max, set) => set.size > max.size ? set : max, new Set());

    function BronKerbosch1(R: Set<string>, P: Set<string>, X: Set<string>, maximalSets: Set<string>[] = []): Set<string>[] {
        if (P.size <= 0 && X.size <= 0) {
            maximalSets.push(R);
            return maximalSets;
        }
        for (let v of P) {
            BronKerbosch1(R.union(new Set([v])), P.intersection(N(v)), X.intersection(N(v)), maximalSets)
            P.delete(v);
            X.add(v);
        }
        return maximalSets;
    }

    function N(v: string): Set<string> {
        return connections.get(v) ?? new Set();
    }
}

let newtorks = find3Networks();
let networksWithT = newtorks.filter(n => n[1][0] == 't' || n[2][0] == 't' || n[3][0] == 't');

let largestNetwork = [...findLargestNetwork()];

console.log(networksWithT.length);
console.log(largestNetwork.sort((a, b) => a > b ? 1 : -1).join(','));
