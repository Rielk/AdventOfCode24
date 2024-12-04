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
    var count = 0;
    for (const basexOff of [-1, 0, 1])
        for (const baseyOff of [-1, 0, 1]) {
            if (checkWord(data, x, y, basexOff, baseyOff))
                count++;
        }
    return count;

    function checkWord(data: string[], x: number, y: number, basexOff: number, baseyOff: number): boolean {
        for (let mult = 0; mult < word.length; mult++) {
            const target = word[mult];
            const xOff = basexOff * mult, yOff = baseyOff * mult;
            if (data[y + yOff]?.[x + xOff] != target)
                return false;
        }
        return true;
    }
}

console.log(count);
