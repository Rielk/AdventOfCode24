import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { mapInput } from "../inputs/getInput";

var example = false;
{
    let crops = mapInput(line => line.split(''), 12, example);
    var data: Array2D<{
        crop: string,
        region: { plots: Vector2[], area: number, perimeter: number, sides: number } | undefined,
        location: Vector2
    }> = new Array2D(crops.length, crops[0].length, (x, y) => {
        return {
            crop: crops[y][x],
            region: undefined,
            location: new Vector2(x, y)
        };
    });
}

function fillRegion(startLoc: Vector2): { plots: Vector2[], area: number, perimeter: number, sides: number } {
    const thisLocData = data.getValue(startLoc);
    if (thisLocData == undefined)
        return { plots: [], area: 0, perimeter: 0, sides: 0 };
    if (thisLocData.region != undefined)
        return thisLocData.region;
    const plots: Vector2[] = [startLoc];
    let adjacentCount = 0, corners = 0;
    for (let i = 0; i < plots.length; i++) {
        const plot = plots[i];
        const insideCorners: Vector2[] = [], outsideCorners: Vector2[] = [];
        for (let adj of plot.adjacent()) {
            let adjLocData = data.getValue(adj);
            if (adjLocData?.crop != thisLocData.crop) {
                for (let corner of adj.adjacent())
                    if (!corner.equals(plot))
                        outsideCorners.push(corner);
                continue;
            }
            adjacentCount++;
            if (!plots.some(p => p.equals(adj)))
                plots.push(adj);
            for (let corner of adj.adjacent())
                insideCorners.push(corner);
        }
        while (insideCorners.length > 0) {
            const corner = insideCorners.pop();
            if (insideCorners.some(c => corner?.equals(c)) && data.getValue(corner!)?.crop != thisLocData.crop)
                corners++;
        }
        while (outsideCorners.length > 0) {
            const corner = outsideCorners.pop();
            if (outsideCorners.some(c => corner?.equals(c)))
                corners++;
        }
    }
    let region = {
        plots: plots,
        area: plots.length,
        perimeter: plots.length * 4 - adjacentCount,
        sides: corners
    };
    plots.forEach(p => data.getValue(p)!.region = region);
    return region;
}

let regions: { area: number, perimeter: number, sides: number }[] = [];
data.forEach2D((val, loc) => {
    if (val.region == undefined)
        regions.push(fillRegion(loc));
})

let totalPrice = regions.map(r => r.area * r.perimeter).reduce((a, b) => a + b);
let totalBulkPrice = regions.map(r => r.area * r.sides).reduce((a, b) => a + b);

console.log(totalPrice);
console.log(totalBulkPrice);
