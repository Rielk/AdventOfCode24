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

function countMakeable(patterns: string[], towels: Map<string, string[]>): number {
    let count = 0;
    let cache = new Map<string, boolean>();
    patterns.forEach(pattern => {
        if (canMake(pattern, towels, cache))
            count++;
    });
    return count;
}

function canMake(pattern: string, towels: Map<string, string[]>, cache: Map<string, boolean>): boolean {
    let cached = cache.get(pattern);
    if (cached != undefined)
        return cached;
    for (let newTowel of towels.get(pattern[0]) ?? []) {
        if (!Pattern.beginsWith(pattern, newTowel))
            continue;
        let remainingPattern = pattern.slice(newTowel.length);
        if (remainingPattern.length <= 0 || canMake(remainingPattern, towels, cache)){
            cache.set(pattern, true);
            return true;
        }
    }
    cache.set(pattern, false);
    return false;
}

console.log(countMakeable(patterns, towels));
