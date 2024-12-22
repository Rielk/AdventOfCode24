export function genSecretFrom(original: number, n: number): number {
    let secret = BigInt(original);
    for (let i = 0; i < n; i++)
        secret = genNextSecret(secret);
    return Number(secret);
}

export function addToPriceChangeMap(original: number, n: number, map: Map<number, number>): Map<number, number> {
    let secret = BigInt(original);
    let price = getPrice(secret);
    let changes = 0;
    for (let i = 0; i < 4; i++) {
        updateChangesAndPrice();
        n--;
    }
    const addedUIDs = new Set<number>();
    addToMap(changes, price);
    for (let i = 0; i < n; i++) {
        updateChangesAndPrice()
        addToMap(changes, price);
    }
    return map;

    function updateChangesAndPrice() {
        secret = genNextSecret(secret);
        let newPrice = getPrice(secret);
        changes = (changes << 8) + (newPrice - price);
        price = newPrice;
    }

    function addToMap(key: number, value: number) {
        if (addedUIDs.has(key))
            return;
        map.set(key, (map.get(key) ?? 0) + value);
        addedUIDs.add(key);
    }
}

function getPrice(secret: bigint): number {
    return Number(secret % 10n);
}

function genNextSecret(secret: bigint): bigint {
    secret = mixAndPrune(secret << 6n, secret);
    secret = mixAndPrune(secret >> 5n, secret);
    secret = mixAndPrune(secret << 11n, secret);
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
