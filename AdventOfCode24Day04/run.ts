import { getInputLineByLine } from "../inputs/getInput";

var example = false;

var data = getInputLineByLine(4, example);

var countXMAS = 0;
var countCrossMAS = 0;
const height = data.length, width = data[0].length;
for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
        countXMAS += doCountWordAround(data, x, y, 'XMAS');
        countCrossMAS += doCountCrossWordAround(data, x, y, 'MAS');
    }

function doCountWordAround(data: string[], x: number, y: number, word: string): number {
    if (data[y][x] != word[0])
        return 0;

    var count = 0;
    for (const basexOff of [-1, 0, 1])
        for (const baseyOff of [-1, 0, 1]) {
            if (basexOff == 0 && baseyOff == 0)
                continue;
            if (checkWord(basexOff, baseyOff))
                count++;
        }
    return count;

    function checkWord(basexOff: number, baseyOff: number): boolean {
        for (let mult = 1; mult < word.length; mult++) {
            const target = word[mult];
            const xOff = basexOff * mult, yOff = baseyOff * mult;
            if (data[y + yOff]?.[x + xOff] != target)
                return false;
        }
        return true;
    }
}

function doCountCrossWordAround(data: string[], x: number, y: number, word: string): number {
    const halfLength = Math.floor(word.length / 2);
    if (data[y][x] != word[halfLength])
        return 0;
    var count = 0;
    for (const basexOff of [-1, 0, 1])
        for (const baseyOff of [-1, 0, 1]) {
            if ((basexOff == 0) == (baseyOff == 0))
                continue;
            if (checkWord(basexOff, baseyOff))
                count++;
        }
    return count;

    function checkWord(basexOff: number, baseyOff: number): boolean {
        for (let charDir = -halfLength; charDir <= halfLength; charDir++) {
            if (charDir == 0) continue;
            for (let perpDir = -halfLength; perpDir <= halfLength; perpDir++) {
                if (perpDir == 0) continue;
                const target = word[charDir + halfLength];
                const xOff = (basexOff * charDir) + (perpDir * baseyOff), yOff = (baseyOff * charDir) + (perpDir * basexOff);
                if (data[y + yOff]?.[x + xOff] != target)
                    return false;
            }
        }
        return true;
    }
}

console.log(`Total number of XMAS: ${countXMAS}`);
console.log(`Total number of X-MAS: ${countCrossMAS}`);
