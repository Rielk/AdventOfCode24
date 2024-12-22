import { mapInput } from "../inputs/getInput";
import { addToPriceChangeMap, genSecretFrom } from "./secrets";

var example = false;

var inputs = mapInput(line => parseInt(line), 22, example);

let secrets2000 = inputs.map(i => genSecretFrom(i, 2000));
let priceChangeMaps = new Map();
 inputs.forEach(i => {
    return addToPriceChangeMap(i, 2000, priceChangeMaps);
});
let maxBananasRecieved = -1;
for(let total of priceChangeMaps.values()) { 
    if (total > maxBananasRecieved)
        maxBananasRecieved = total;
}

console.log(secrets2000.reduce((x, y) => x + y));
console.log(maxBananasRecieved);
