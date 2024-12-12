import { Array2D } from "../general/array2D";
import { Vector2 } from "../general/vector2";
import { mapArray2DInput } from "../inputs/getInput";

var example = false;

var data: Array2D<{
    crop: string,
    region: { plots: Vector2[], area: number, perimeter: number, sides: number } | undefined
}> = mapArray2DInput(value => {
    return {
        crop: value,
        region: undefined
    }
}, '', 12, example);

function fillRegion(startLoc: Vector2): { plots: Vector2[], area: number, perimeter: number, sides: number } {
    const thisLocData = data.getValue(startLoc);
    if (thisLocData == undefined)
        return { plots: [], area: 0, perimeter: 0, sides: 0 };
    if (thisLocData.region != undefined)
        return thisLocData.region;
    const plots: Vector2[] = [startLoc];
    let adjacentCount = 0, corners = 0;
    for (let i = 0; i < plots.length; i++) {
        const center = plots[i];
        const insideCorners: Vector2[] = [], outsideCorners: Vector2[] = [];
        for (let adj of center.adjacent()) {
            compareAdjacent(adj, center, outsideCorners, insideCorners);
        }
        countInsideCorners(insideCorners);
        countOutsideCorners(outsideCorners);
    }
    let region = {
        plots: plots,
        area: plots.length,
        perimeter: plots.length * 4 - adjacentCount,
        sides: corners
    };
    plots.forEach(p => data.getValue(p)!.region = region);
    return region;

    function compareAdjacent(adj: Vector2, center: Vector2, outsideCorners: Vector2[], insideCorners: Vector2[]) {
        let adjLocData = data.getValue(adj);
        if (adjLocData?.crop != thisLocData!.crop) {
            for (let corner of adj.adjacent())
                if (!corner.equals(center))
                    outsideCorners.push(corner);
            return;
        }
        adjacentCount++;
        if (!plots.some(p => p.equals(adj)))
            plots.push(adj);
        for (let corner of adj.adjacent())
            insideCorners.push(corner);
    }

    function countOutsideCorners(outsideCorners: Vector2[]) {
        while (outsideCorners.length > 0) {
            const corner = outsideCorners.pop();
            if (outsideCorners.some(c => corner?.equals(c)))
                corners++;
        }
    }

    function countInsideCorners(insideCorners: Vector2[]) {
        while (insideCorners.length > 0) {
            const corner = insideCorners.pop();
            if (insideCorners.some(c => corner?.equals(c)) && data.getValue(corner!)?.crop != thisLocData!.crop)
                corners++;
        }
    }
}

let regions: { area: number, perimeter: number, sides: number }[] = [];
data.forEach2D((val, loc) => {
    if (val.region == undefined)
        regions.push(fillRegion(loc));
})

let totalPrice = regions.map(r => r.area * r.perimeter).reduce((a, b) => a + b);
let totalBulkPrice = regions.map(r => r.area * r.sides).reduce((a, b) => a + b);

console.log(`Total Price: ${totalPrice}`);
console.log(`Total Discounted Price: ${totalBulkPrice}`);
