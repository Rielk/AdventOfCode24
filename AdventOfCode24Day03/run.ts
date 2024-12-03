import { error } from "console";
import { getInput } from "../inputs/getInput";

var example = false;

const mulrx = /mul\(\d{1,3},\d{1,3}\)/, dorx = /do\(\)/, dontrx = /don't\(\)/

var commands = getInput(3, example).match(new RegExp(mulrx.source + '|' + dorx.source + '|' + dontrx.source, 'g'));

function doMul(match: string) {
    var split = match.match(/\d+/g);
    if (split == undefined || split.length != 2)
        throw error('Invalid Match');
    return parseInt(split[0]) * parseInt(split[1]);
}

var allValueSum = commands?.reduce((sum, command) => {
    if (mulrx.test(command))
        sum += doMul(command);
    return sum;
}, 0);

var cleverSum = commands?.reduce(({ sum, doing }, command) => {
    if (dorx.test(command))
        doing = true;
    else if (dontrx.test(command))
        doing = false;
    else if (doing)
        sum += doMul(command);
    return {
        sum: sum,
        doing: doing
    };
}, { sum: 0, doing: true }).sum;

console.log(`Sum of All Multiplications: ${allValueSum}`);
console.log(`Better sum of Multiplications: ${cleverSum}`);
