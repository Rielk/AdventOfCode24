import { error } from "node:console";
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
    if (word.length != 3)
        throw error;
    if (data[y][x] != word[1])
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
        for (const charMult of [1, -1])
            for (const sideOffset of [1, -1]){
                const target = word[charMult == 1 ? 0 : 2];
                const xOff = (basexOff*charMult)+(sideOffset*baseyOff), yOff = (baseyOff*charMult)+(sideOffset*basexOff);
                if (data[y + yOff]?.[x + xOff] != target)
                    return false;
            }
        return true;
    }
}

console.log(`Total number of XMAS: ${countXMAS}`);
console.log(`Total number of X-MAS: ${countCrossMAS}`);
