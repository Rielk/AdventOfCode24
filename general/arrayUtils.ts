export function addToSortedArray<T>(array: Array<T>, item: T, ascend: boolean = true) {
    array.splice(sortedIndex(array, item, ascend), 0, item);
}

function sortedIndex<T>(array: Array<T>, item: T, ascend: boolean) : number {
    var low = 0;
    var hig = array.length;

    while (low < hig)
    {
        var mid = (low + hig) >>> 1;
        if (array[mid] < item)
            if (ascend)
                low = mid + 1;
            else
                hig = mid;
        else
            if (ascend)
                hig = mid;
            else
                low = mid + 1
    }
    return low
}

export function arrayAfterSplice<T>(array: Array<T>, start: number, deleteCount: number = 1) {
    const newArray = Array.from(array);
    newArray.splice(start, deleteCount);
    return newArray;
}
