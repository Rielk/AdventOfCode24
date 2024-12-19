import { map2SectionInput } from "../inputs/getInput";
import { Pattern } from "./pattern";

var example = false;

var { data1: towelArray, data2: patterns } = map2SectionInput(
    line => {
        return line.split(', ');
    }, inputs => {
        return inputs.flat();
    }, line => {
        return line;
    }, x => x, 19, example);
let towels = new Map<string, string[]>();
towelArray.forEach(t => {
    let start = t[0];
    let arr = towels.get(start);
    if (arr == undefined)
        towels.set(start, arr = []);
    arr.push(t);
})

function countMakeable(patterns: string[]): number {
    let count = 0;
    patterns.forEach(pattern => {
        if (findWaysToMake(pattern) > 0)
            count++;
    });
    return count;
}

let cache = new Map<string, number>();
function findWaysToMake(pattern: string): number {
    let cached = cache.get(pattern);
    if (cached != undefined)
        return cached;
    let waysToMake = 0;
    for (let newTowel of towels.get(pattern[0]) ?? []) {
        if (!Pattern.beginsWith(pattern, newTowel))
            continue;
        let remainingPattern = pattern.slice(newTowel.length);
        if (remainingPattern.length <= 0) {
            waysToMake += 1;
        }
        else {
            waysToMake += findWaysToMake(remainingPattern)
        }
    }
    cache.set(pattern, waysToMake);
    return waysToMake;
}

console.log(countMakeable(patterns));
console.log(patterns.map(p => findWaysToMake(p)).reduce((x, y) => x + y));
