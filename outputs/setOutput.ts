import { writeFileSync, appendFileSync } from "node:fs";

export function writeOutputFile(lines: Iterable<string>, day: number) : void {
    const fileName = `./outputs/${day}.txt`;
    writeFileSync(fileName, '');
    for (let line of lines)
        appendFileSync(fileName, line+'\r\n');
}