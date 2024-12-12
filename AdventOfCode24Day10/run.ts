import { Vector2 } from "../general/vector2";
import { Array2D } from "../general/array2D";
import { mapInput } from "../inputs/getInput";

var example = false;

{
    let inputs = mapInput((line) => {
        return line.split('').map(c => parseInt(c));
    }, 10, example);
    var data = new Array2D<{ height: number, leadsTo: Set<Vector2> | undefined }>
        (inputs.length, inputs[0].length, (x, y) => { return { height: inputs[y][x], leadsTo: undefined } });
}
function followTrail(start: Vector2): Set<Vector2> {
    var thisLocData = data.getValue(start);
    if (thisLocData == undefined)
        return new Set();

    thisLocData.leadsTo = new Set();
    if (thisLocData.height == 9) {
         thisLocData.leadsTo.add(start);
         return thisLocData.leadsTo;
    }
    for (let adjacent of start.adjacent()) {
        let adjLocData = data.getValue(adjacent);
        if (adjLocData == undefined ||  adjLocData.height != thisLocData.height + 1)
            continue;
        if (adjLocData.leadsTo == undefined)
            followTrail(adjacent);
        adjLocData.leadsTo!.forEach(v => thisLocData!.leadsTo!.add(v));
    }
    return thisLocData.leadsTo;
}

function calcScore(loc : Vector2) :number {
    return followTrail(loc).size;
}

var score = 0;
data.forEach2D((value, loc) => {
    if (value.height == 0)
        score += calcScore(new Vector2(loc.x, loc.y));
});

console.log(score);
