import { getInput } from "../inputs/getInput";

var example = true;

var data = getInput(3, example);

var matches = data.match(/mul\(\d{1,3},\d{1,3}\)/g);
const matchToVal = (match: string) => {
    var split = match.split(',');
    var x = parseInt(split[0].replace('mul(', ''));
    var y = parseInt(split[1].replace(')', ''));
    return x * y;
}

var values = matches?.map(matchToVal);
var sum = values?.reduce((x, y) => x + y);

console.log(`Sum of Multiplications: ${sum}`);
