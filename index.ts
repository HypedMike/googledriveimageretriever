import { Seeker } from "./seeker";
import fs from "fs";

let data = JSON.parse(fs.readFileSync("./personal.json", {
    encoding: 'utf-8'
}));

let s = new Seeker(data["testlink"]);

s.downloadPage().then((res) => {
    console.log(res);
})