import { map2SectionInput } from "../inputs/getInput";
import { Pattern } from "./pattern";

var example = false;

var { data1: towels, data2: patterns } = map2SectionInput(
    line => {
        return line.split(', ');
    }, inputs => {
        return inputs.flat();
    }, line => {
        return line;
    }, x => x, 19, example);

let cache = new Map<string, number>();
function findWaysToMake(pattern: string): number {
    let cached = cache.get(pattern);
    if (cached != undefined)
        return cached;
    let waysToMake = 0;
    for (let newTowel of towels) {
        if (!Pattern.beginsWith(pattern, newTowel))
            continue;
        let remainingPattern = pattern.slice(newTowel.length);
        if (remainingPattern.length <= 0)
            waysToMake += 1;
        else
            waysToMake += findWaysToMake(remainingPattern)
    }
    cache.set(pattern, waysToMake);
    return waysToMake;
}

let countWaysToMake = patterns.map(p => findWaysToMake(p));

let possiblePatterns = countWaysToMake.reduce((total, x) => total + (x > 0 ? 1 : 0), 0);
let totalCombinations = countWaysToMake.reduce((x, y) => x + y);

console.log(`Possible Designs: ${possiblePatterns}`);
console.log(`Sum of Different Ways to Make Each: ${totalCombinations}`);
