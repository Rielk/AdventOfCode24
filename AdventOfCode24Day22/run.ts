import { mapInput } from "../inputs/getInput";
import { getSecretFrom } from "./secrets";

var example = false;

var inputs = mapInput(line => parseInt(line), 22, example);

let secrets2000 = inputs.map(i => getSecretFrom(i, 2000));

console.log(secrets2000.reduce((x, y) => x + y));
