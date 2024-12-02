import { addToSortedArray } from "../general/sortedArray";
import { processInput } from "../inputs/getInput";

var example = false;

var list1 = new Array<number>();
var list2 = new Array<number>();
processInput((line: string) => {
    var split = line.split('   ');
    addToSortedArray(list1, parseInt(split[0]));
    addToSortedArray(list2, parseInt(split[1]));
},1, example);

var distance = list1.reduce((sum, x, i) => {
    return sum + Math.abs(x - list2[i]);
}, 0);

var similarity = list1.reduce((sum, x) => {
    return sum + list2.reduce((sum2, y) => {
        if (y == x)
            return sum2 + y;
        else
            return sum2;
    }, 0);
}, 0);

console.log(`Total Distance: ${distance}`);
console.log(`Total Similarity: ${similarity}`);
