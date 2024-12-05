import { arrayMove } from "../general/arrayUtils";
import { processInput } from "../inputs/getInput";

var example = false;

var rules = new Map<number, Array<number>>();
var updates: number[][] = [];
processInput(function (line: string) {
    if (line == '') {
        this.part2 = true;
        return;
    }
    if (this.part2){
        updates.push(line.split(',').map(s => parseInt(s)));
    }
    else {
        var [before, after] = line.split('|').map(s => parseInt(s));
        var existing = rules.get(after);
        if (existing == undefined)
            rules.set(after, existing = []);
        if (!existing.includes(before))
            existing.push(before);
    }
}, 5, example, {});

var passingUpdates = updates.filter(update => checkOrder(update));
var sumOfMiddlePassing = passingUpdates.map(update => update[Math.floor(update.length/2)]).reduce((x,y) => x+y);

var failingUpdates = updates.filter(update => !checkOrder(update));
var fixedUpdates = failingUpdates.map(update => fixOrder(update));
var sumOfMiddleFixed = fixedUpdates.map(update => update[Math.floor(update.length/2)]).reduce((x,y) => x+y);

function checkOrder(update: number[]) : boolean {
    for (let i = 0; i < update.length; i++) {
        const page = update[i];
        const required = rules.get(page);
        if (!hasRequiredPagesBefore(required, i))
            return false;
    }
    return true;

    function hasRequiredPagesBefore(required: number[] | undefined, i: number) : boolean {
        if (required == undefined || required.length <= 0)
            return true;

        for (let ri = 0; ri < required.length; ri++) {
            const reqPage = required[ri];
            for (let ci = i; ci < update.length; ci++) {
                const checkPage = update[ci];
                if (reqPage == checkPage)
                    return false;
            }
        }
        return true;
    }
}

function fixOrder(update: number[]) : number[] {
    update = [...update];

    for (let i = 0; i < update.length; i++) {
        const page = update[i];
        const required = rules.get(page);
        if(moveRequiredPages(required, i))
            i--;
    }

    function moveRequiredPages(required: number[] | undefined, i: number) : boolean {
        if (required == undefined || required.length <= 0)
            return false;

        var changed = false;
        for (let ri = 0; ri < required.length; ri++) {
            const reqPage = required[ri];
            for (let ci = i; ci < update.length; ci++) {
                const checkPage = update[ci];
                if (reqPage == checkPage) {
                    arrayMove(update, ci, i);
                    changed = true;
                }
            }
        }
        return changed;
    }

    return update;
}

console.log(sumOfMiddlePassing);
console.log(sumOfMiddleFixed);
