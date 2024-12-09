import { getInput } from "../inputs/getInput";

var example = false;

var fileSizes = getInput(9, example).split('').map(c => parseInt(c));

var chopSortChecksum = calcChopSortChecksum(fileSizes);
var blockSortChecksum = calcBlockSortChecksum(fileSizes);

function calcChopSortChecksum(fileSizes : number[]): number {
    fileSizes = [...fileSizes];
    let ret = 0, empty = false;
    let idStart = 0, dataIndex = 0, idEnd = Math.floor(fileSizes.length / 2);
    for (let i = 0; i < fileSizes.length; i++, empty = !empty) {
        let startSize = fileSizes[i];
        if (empty) {
            let endSize : number;
            while ((endSize = fileSizes.pop()!) < startSize) {
                ret += calcIncreaseInChecksum(dataIndex, endSize, idEnd--);
                fileSizes.pop();
                startSize -= endSize;
                dataIndex += endSize;
            }
            fileSizes.push(endSize - startSize);
            ret += calcIncreaseInChecksum(dataIndex, startSize, idEnd);
        }
        else {
            ret += calcIncreaseInChecksum(dataIndex, startSize, idStart++);
        }
        dataIndex += startSize;
    }
    return ret;
}

function calcBlockSortChecksum(fileSizes : number[]): number {
    let bySize = sortBySize(fileSizes);
    let done = new Array<boolean>(Math.floor(fileSizes.length / 2));
    let ret = 0, empty = false;
    let id = 0, dataIndex = 0;
    for (let i = 0; i < fileSizes.length; i++, empty = !empty) {
        let size = fileSizes[i];
        if (empty) {
            let outs = { idOfFit: 0, sizeOfFit: 0 };
            while (findNextFit(bySize, size, done, outs)) {
                ret += calcIncreaseInChecksum(dataIndex, outs.sizeOfFit, outs.idOfFit);
                done[outs.idOfFit] = true;
                size -= outs.sizeOfFit;
                dataIndex += outs.sizeOfFit;
            }
        }
        else {
            if (!done[id]) {
                ret += calcIncreaseInChecksum(dataIndex, size, id);
                done[id] = true;
            }
            id++;
        }
        dataIndex += size;
    }
    return ret;

    function findNextFit(bySize: Map<number, number[]>, maxLength: number, done : boolean[], outs: { idOfFit: number, sizeOfFit: number }): boolean {
        let options = [];
        for (let [size, ids] of bySize.entries()) {
            if (size > maxLength)
                break;
            if (ids.length <= 0)
                continue;
            let id;
            while (done[id = ids[ids.length-1]])
                ids.pop();
            options.push({size: size, id: id});
        }
        outs.idOfFit = -1; outs.sizeOfFit = 0;
        for (let i = options.length - 1; i >=  0; i--) {
            const {size, id} = options[i];
            if (id > outs.idOfFit){
                outs.idOfFit = id;
                outs.sizeOfFit = size;
            }
        }
        if (outs.idOfFit < 0)
            return false;
        bySize.get(outs.sizeOfFit)?.pop();
        return true;
    }

    function sortBySize(fileSizes : number[]): Map<number, number[]> {
        let ret = new Map<number, number[]>();
        let id = 0, empty = false;
        for (let i = 0; i < fileSizes.length; i++, empty = !empty) {
            const number = fileSizes[i];
            if (!empty) {
                let arr = ret.get(number);
                if (arr == undefined)
                    ret.set(number, arr = []);
                arr.push(id);
                id++;
            }
        }
        ret = new Map([...ret.entries()].sort((a, b) => a[0] - b[0]));
        return ret
    }
}

function calcIncreaseInChecksum(start: number, size: number, id: number) {
    let ret = 0;
    for (let j = 0; j < size; j++)
        ret += (start + j) * id;
    return ret;
}

console.log(`Chop Sort Checksum: ${chopSortChecksum}`)
console.log(`Chop Sort Checksum: ${blockSortChecksum}`)

