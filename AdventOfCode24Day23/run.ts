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

let newtorks = find3Networks();
let networksWithT = newtorks.filter(n => n[1][0] == 't' || n[2][0] == 't' || n[3][0] == 't');

console.log(networksWithT.length);
