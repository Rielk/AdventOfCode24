import { getInputLineByLine } from "../inputs/getInput";

var example = false;

var data = getInputLineByLine(4, example);

var count = 0;
const height = data.length, width = data[0].length;
for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
        count += countWordAround(data, x, y, 'XMAS');
    }

function countWordAround(data: string[], x: number, y: number, word: string): number {
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

console.log(`Total number of XMAS: ${count}`);
