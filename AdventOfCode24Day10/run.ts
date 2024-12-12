import { Vector2 } from "../general/vector2";
import { Array2D } from "../general/array2D";
import { mapInput } from "../inputs/getInput";

var example = false;

{
    let inputs = mapInput((line) => {
        return line.split('').map(c => parseInt(c));
    }, 10, example);
    var data = new Array2D<{ height: number, leadsTo: Vector2[] | undefined }>
        (inputs.length, inputs[0].length, (x, y) => { return { height: inputs[y][x], leadsTo: undefined } });
}
function followTrail(start: Vector2): Array<Vector2> {
    var thisLocData = data.getValue(start);
    if (thisLocData == undefined)
        return [];
    if (thisLocData.height == 9)
        return thisLocData.leadsTo = [start];
    thisLocData.leadsTo = [];
    for (let adjacent of start.adjacent()) {
        let adjLocData = data.getValue(adjacent);
        if (adjLocData == undefined || adjLocData.height != thisLocData.height + 1)
            continue;
        if (adjLocData.leadsTo == undefined)
            followTrail(adjacent);
        thisLocData.leadsTo.splice(0,0, ...adjLocData.leadsTo!);
    }
    return thisLocData.leadsTo;
}

function calcScore(loc : Vector2) : {score: number, rating: number} {
    var trailHeads = followTrail(loc)
    return {score: trailHeads.filter((v,i) => trailHeads.indexOf(v) == i).length,
        rating: trailHeads.length
    };
}

var score = 0, rating = 0;
data.forEach2D((value, loc) => {
    if (value.height == 0) {
        var {score: s, rating :r} = calcScore(loc);
        score += s; rating += r;
    }
});

console.log(`Sum of scores: ${score}`);
console.log(`Sum of ratings: ${rating}`);
