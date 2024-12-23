export function BronKerbosch(vertices: Iterable<string>, getNeighbours: (v: string) => Set<string>): Set<string>[] {
    let maximalSets: Set<string>[] = [];
    InternalBronKerbosch(new Set(), new Set(vertices), new Set());
    return maximalSets;

    function InternalBronKerbosch(R: Set<string>, P: Set<string>, X: Set<string>): void {
        if (P.size <= 0 && X.size <= 0)
            maximalSets.push(new Set(R));
        else
            for (let v of P) {
                const neighbours = getNeighbours(v);
                InternalBronKerbosch(R.add(v), P.intersection(neighbours), X.intersection(neighbours));
                R.delete(v); P.delete(v); X.add(v);
            }
    }
}
