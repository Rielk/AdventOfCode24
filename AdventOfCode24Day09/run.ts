import { getInput } from "../inputs/getInput";

var example = true;

var data : (number | undefined)[]= [];
{
    var empty = false;
    var input = getInput(9, example);
    var id = 0;
    for (let n = 0; n < input.length; n++) {
        const number = parseInt(input[n]);
        if (empty)
            for (let i = 0; i < number; i++)
                data.push(undefined);
        else {
            for (let i = 0; i < number; i++)
                data.push(id)
            id++;
        }
        empty = !empty;
    }
}

var checksum = calcChecksum(data);

function calcChecksum(data: (number | undefined)[]): number {
    data = [...data];
    var ret = 0;
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        while (element == undefined && i < data.length)
            element = data.pop();
        if (element == undefined)
            break;
        ret += i * element;
    }
    return ret;
}

console.log(`Checksum: ${checksum}`)
