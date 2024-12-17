export function CantorPairing(x: number, y: number): number {
    let sum = x + y;
    return (.5 * sum * (sum + 1)) + y;
}

export function CantorNegtivePairing(x: number, y: number): number {
    x = x >= 0 ? 2 * x : -2 * x - 1;
    y = y >= 0 ? 2 * y : -2 * y - 1;
    return CantorPairing(x, y);
}
