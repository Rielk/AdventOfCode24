import { mapInput } from "../inputs/getInput";
import { genPriceChangeMapFrom, genSecretFrom, getChangesUID } from "./secrets";

var example = false;

var inputs = mapInput(line => parseInt(line), 22, example);

let secrets2000 = inputs.map(i => genSecretFrom(i, 2000));
let priceChangeMaps = inputs.map(i => genPriceChangeMapFrom(i, 2000));

let allChangesUID = [];
for (let i = -9; i <= 9; i++)
    for (let j = -9; j <= 9; j++)
        for (let k = -9; k <= 9; k++)
            for (let l = -9; l <= 9; l++) {
                allChangesUID.push({
                    uid: getChangesUID([i, j, k, l]),
                    0: i,
                    1: j,
                    2: k,
                    3: l
                });
            }

let maxBananasRecieved = allChangesUID.map(changeUID => {
    return { 
        ...changeUID,
        total: priceChangeMaps.reduce((x, y) => {
            return x + (y.get(changeUID.uid) ?? 0);
        }, 0)
    };
}).reduce((max, o) => o.total > max ? o.total : max, -1);

console.log(secrets2000.reduce((x, y) => x + y));
console.log(maxBananasRecieved);
