import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { mapInput } from "../inputs/getInput";

var example = false;
{
    let crops = mapInput(line => line.split(''), 12, example);
    var data: Array2D<{
        crop: string,
        region: { plots: Vector2[], area: number, perimeter: number } | undefined,
        location: Vector2
    }> = new Array2D(crops.length, crops[0].length, (x, y) => {
        return {
            crop: crops[y][x],
            region: undefined,
            location: new Vector2(x, y)
        };
    });
}

function fillRegion(startLoc: Vector2): { plots: Vector2[]; area: number; perimeter: number; } {
    const thisLocData = data.getValue(startLoc);
    if (thisLocData == undefined)
        return { plots: [], area: 0, perimeter: 0 };
    if (thisLocData.region != undefined)
        return thisLocData.region;
    const plots: Vector2[] = [startLoc];
    let adjacentCount = 0;
    for (let i = 0; i < plots.length; i++) {
        const plot = plots[i];
        for (let adj of plot.adjacent()) {
            let adjLocData = data.getValue(adj);
            if (adjLocData?.crop != thisLocData.crop)
                continue;
            adjacentCount++;
            if (!plots.some(p => p.equals(adj)))
                plots.push(adj);
        }
    }
    let region = {
        plots: plots,
        area: plots.length,
        perimeter: plots.length * 4 - adjacentCount
    };
    plots.forEach(p => data.getValue(p)!.region = region);
    return region;
}

let regions: { area: number, perimeter: number }[] = [];
data.forEach2D((val, loc) => {
    if (val.region == undefined)
        regions.push(fillRegion(loc));
})

let totalPrice = regions.map(r => r.area * r.perimeter).reduce((a, b) => a + b);

console.log(totalPrice);
