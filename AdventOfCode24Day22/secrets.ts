export function getSecretFrom(original: number, n: number) : number {
    let secret = BigInt(original);
    for (let i = 0; i < n; i++) {
        secret = mixAndPrune(secret * 64n, secret);
        secret = mixAndPrune(secret / 32n, secret);
        secret = mixAndPrune(secret * 2048n, secret);
    }
    return Number(secret);
}

function mixAndPrune(x: bigint, y: bigint) : bigint {
    return prune(mix(x, y));
}

function mix(x: bigint, y: bigint) : bigint { 
    return x ^ y;
}

function prune(x: bigint) : bigint {
    return x % 16777216n;
}
