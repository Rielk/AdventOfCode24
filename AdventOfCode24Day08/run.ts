import { Vector2 } from "../general/vector2";
import { processInput } from "../inputs/getInput";

var example = false;

var height = 0;
var width = 0;
var attena = new Map<string, Vector2[]>();
processInput((line, j) => {
    height = j+1;
    width = width < line.length ? line.length : width;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char == '.')
            continue;
        var entry = attena.get(char);
        if (!entry)
            attena.set(char, entry = []);
        entry.push(new Vector2(i, j));

    }
}, 8, example);

var nodeCountWithout = 0;
var nodeCountWith = 0;
for (let x = 0; x < width; x++) 
    for (let y = 0; y < height; y++) {
        if (checkNode(x, y, (vecA, vecB, vecDif) => vecA.equals(vecDif) || vecB.multiply(-1).equals(vecDif)))
            nodeCountWithout++;
        if (checkNode(x, y, (vecA, vecB, vecDif) => vecA.isMultipleOf(vecDif) || vecB.isMultipleOf(vecDif)))
            nodeCountWith++;
}

function checkNode(x: number, y: number, predicate: (vecA: Vector2, vecB: Vector2, vecDif: Vector2) => boolean): boolean {
    for (var freqSet of attena.values())
        for (let a = 0; a < freqSet.length; a++)
            for (let b = a + 1; b < freqSet.length; b++) {
                const vecDif = freqSet[b].subtract(freqSet[a]);     //Vector to get from A to B
                const vecA = freqSet[a].subtract({ x: x, y: y });   //Vector to get from Target to A
                const vecB = freqSet[b].subtract({ x: x, y: y });   //Vector to get from Target to B
                if (predicate(vecA, vecB, vecDif))
                    return true;
            }
    return false;
}

console.log(`Total Unique Node Locations without Harmonics: ${nodeCountWithout}`);
console.log(`Total Unique Node Locations with Harmonics: ${nodeCountWith}`);
