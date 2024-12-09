import { getInput } from "../inputs/getInput";

var example = false;

var data: (number | undefined)[] = [];
var filesOfSize: Map<number, number[]> = new Map();
{
    var input = getInput(9, example);
    let id = 0, empty = false;
    for (let n = 0; n < input.length; n++) {
        const number = parseInt(input[n]);
        if (empty)
            for (let i = 0; i < number; i++)
                data.push(undefined);
        else {
            for (let i = 0; i < number; i++)
                data.push(id)
            let arr = filesOfSize.get(number);
            if (arr == undefined)
                filesOfSize.set(number, arr = []);
            arr.push(id);
            id++;
        }
        empty = !empty;
    }
}
filesOfSize = new Map([...filesOfSize.entries()].sort((a, b) => a[0] - b[0]));

var chopSortChecksum = calcChopSortChecksum(data);
var blockSortChecksum = calcBlockSortChecksum(data);

function calcChopSortChecksum(data: (number | undefined)[]): number {
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

function calcBlockSortChecksum(data: (number | undefined)[]): number {
    {
        let ret = 0;
        let id = 0, empty = false, dataIndex = 0;
        for (let i = 0; i < input.length; i++) {
            let length = parseInt(input[i]);
            if (empty) {
                let outs = { idOfFit: 0, lengthOfFit: 0 };
                while (findNextFit(length, outs)) {
                    let { idOfFit, lengthOfFit } = outs;
                    ret += calcIncreaseInChecksum(dataIndex, lengthOfFit, idOfFit);
                    dataIndex += lengthOfFit;
                    length -= lengthOfFit;
                }
                dataIndex += length;
            }
            else {
                let arr = filesOfSize.get(length);
                let index = arr?.indexOf(id);
                if (index == undefined || index < 0) { }
                else {
                    arr?.splice(index, 1);
                    ret += calcIncreaseInChecksum(dataIndex, length, id);
                }
                dataIndex += length;
                id++;
            }
            empty = !empty;
        }
        return ret;
    }

    function calcIncreaseInChecksum(start: number, length: number, id: number) {
        let ret = 0;
        for (let j = 0; j < length; j++)
            ret += (start + j) * id;
        return ret;
    }

    function findNextFit(maxLength: number, outs: { idOfFit: number, lengthOfFit: number }): boolean {
        let options = [];
        for (let [length, ids] of filesOfSize.entries()) {
            if (length > maxLength)
                break;
            if (ids.length <= 0)
                continue;
            options.push({length: length, id: ids[ids.length-1]});
        }
        let maxId = -1, maxIdLength = 0;
        for (let i = options.length - 1; i >=  0; i--) {
            const {length, id} = options[i];
            if (id > maxId){
                maxId = id;
                maxIdLength = length;
            }
        }
        if (maxId < 0)
            return false;
        filesOfSize.get(maxIdLength)?.pop();
        outs.idOfFit = maxId;
        outs.lengthOfFit = maxIdLength;
        return true;
    }
}

console.log(`Chop Sort Checksum: ${chopSortChecksum}`)
console.log(`Chop Sort Checksum: ${blockSortChecksum}`)

