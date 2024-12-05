import { arrayMove } from "../general/arrayUtils";
import { processInput } from "../inputs/getInput";

var example = false;

var rules = new Map<number, number[]>();
var updates: number[][] = [];
processInput(function (line: string) {
    if (line == '') 
        this.part2 = true;
    else if (this.part2)
        updates.push(line.split(',').map(s => parseInt(s)));
    else {
        var [before, after] = line.split('|').map(s => parseInt(s));
        var existing = rules.get(after);
        if (existing == undefined)
            rules.set(after, existing = []);
        if (!existing.includes(before))
            existing.push(before);
    }
}, 5, example, {});

var { pass: passingUpdates, fail: failingUpdates } = updates.reduce(({ pass, fail }: { pass: number[][], fail: number[][] }, update) => {
    checkOrder(update) ? pass.push(update) : fail.push(update);
    return { pass, fail };
}, { pass: [], fail: [] });

var fixedUpdates = failingUpdates.map(update => fixOrder(update));

var sumOfMiddlePassing = sumMiddleValues(passingUpdates);
var sumOfMiddleFixed = sumMiddleValues(fixedUpdates);

function checkOrder(update: number[]) : boolean {
    for (let i = 0; i < update.length; i++)
        if (!hasRequiredPagesBefore(rules.get(update[i]), i))
            return false;
    return true;

    function hasRequiredPagesBefore(required: number[] | undefined, i: number) : boolean {
        if (required == undefined || required.length <= 0)
            return true;

        for (let ri = 0; ri < required.length; ri++) 
            for (let ci = i; ci < update.length; ci++) 
                if (required[ri] == update[ci])
                    return false;
        return true;
    }
}

function fixOrder(update: number[]) : number[] {
    update = [...update];
    for (let i = 0; i < update.length; i++) 
        if(moveRequiredPages(rules.get(update[i]), i))
            i--;
    return update;

    function moveRequiredPages(required: number[] | undefined, ii: number) : boolean {
        if (required == undefined || required.length <= 0)
            return false;

        var changed = false;
        for (let ri = 0; ri < required.length; ri++)
            for (let ui = ii; ui < update.length; ui++)
                if (required[ri] == update[ui]) {
                    arrayMove(update, ui, ii);
                    changed = true;
                }
        return changed;
    }
}

function sumMiddleValues(updates: number[][]): number {
    return updates.map(update => update[Math.floor(update.length/2)]).reduce((x,y) => x+y)
}

console.log(`Sum of Middle of Correctly-Ordered updates: ${sumOfMiddlePassing}`);
console.log(`Sum of Middle of Fixed updates: ${sumOfMiddleFixed}`);
