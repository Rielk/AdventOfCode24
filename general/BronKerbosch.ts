export function BronKerbosch(vertices: Iterable<string>, N: (v: string) => Set<string>): Set<string>[] {
    let maximalSets: Set<string>[] = [];
    return InternalBronKerbosch(new Set(), new Set(vertices), new Set());

    function InternalBronKerbosch(R: Set<string>, P: Set<string>, X: Set<string>): Set<string>[] {
        if (P.size <= 0 && X.size <= 0) {
            maximalSets.push(new Set(R));
            return maximalSets;
        }
        for (let v of P) {
            InternalBronKerbosch(R.union(new Set([v])), P.intersection(N(v)), X.intersection(N(v)));
            P.delete(v);
            X.add(v);
        }
        return maximalSets;
    }
}
