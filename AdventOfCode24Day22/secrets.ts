import { CantorNegtivePairing, CantorPairing } from "../general/CantorPairing";

export function genSecretFrom(original: number, n: number): number {
    let secret = BigInt(original);
    for (let i = 0; i < n; i++)
        secret = genNextSecret(secret);
    return Number(secret);
}

export function addToPriceChangeMap(original: number, n: number, map: Map<number ,number>): Map<number, number> {
    let secret = BigInt(original);
    let price = getPrice(secret);
    let changes: [number, number, number, number] = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        secret = genNextSecret(secret);
        let newPrice = getPrice(secret);
        changes[i] = newPrice - price;
        price = newPrice;
        n--;
    }
    const addedUIDs = new Set<number>();
    addToMap(getChangesUID(changes), price);
    for (let i = 0; i < n; i++) {
        let newSecret = genNextSecret(secret);
        let newPrice = getPrice(newSecret);
        changes.shift();
        changes.push(newPrice - price);
        secret = newSecret;
        price = newPrice;
        addToMap(getChangesUID(changes), price);
    }
    return map;

    function addToMap(key: number, value: number) {
        if (addedUIDs.has(key))
            return;
        let curr = map.get(key) ?? 0;
        map.set(key, curr + value);
        addedUIDs.add(key);
    }
}

function getPrice(secret: bigint): number {
    return Number(secret % 10n);
}

export function getChangesUID(changes: [number, number, number, number]): number {
    return CantorPairing(
        CantorNegtivePairing(changes[0], changes[1]),
        CantorNegtivePairing(changes[2], changes[3]));
}

function genNextSecret(secret: bigint): bigint {
    secret = mixAndPrune(secret * 64n, secret);
    secret = mixAndPrune(secret / 32n, secret);
    secret = mixAndPrune(secret * 2048n, secret);
    return secret;
}

function mixAndPrune(x: bigint, y: bigint): bigint {
    return prune(mix(x, y));
}

function mix(x: bigint, y: bigint): bigint {
    return x ^ y;
}

function prune(x: bigint): bigint {
    return x % 16777216n;
}
