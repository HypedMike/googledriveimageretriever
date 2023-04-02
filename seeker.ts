import { get } from "https";
import {JSDOM} from "jsdom";
import { DriveImage } from "./customtype";

export class Seeker {
    url: string;
    data: string;
    constructor(url: string) {
        this.url = url;
        this.data = "";
    }

    downloadPage() {
        get(this.url, (res) => {
            console.log(res.statusCode);
            res.setEncoding('utf8');
            res.on('data', (data) => {
                this.data += data;
            });
            res.on("end", () => {
                this.getPhotos();
            })
        }).on('error', function(err) {
            console.log(err);
        });
    }

    getPhotos(){
        console.log("Getting photos from:" + this.url);

        let dom = new JSDOM(this.data, {
            includeNodeLocations: true
        });

        let containers = dom.window.document.querySelectorAll(".flip-entry");

        // each container has a photo

        let photo:DriveImage[] = [];

        containers.forEach(c => {
            if(c != null){
                let a_link = c.querySelector("a").href;
                let temp = c.querySelector("img");
                let name = c.querySelector(".flip-entry-title");
                photo.push(new DriveImage(name.innerHTML, temp.src, a_link));
            }
        });

        return photo;

    }
}