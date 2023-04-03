import { get } from "https";
import {JSDOM} from "jsdom";
import { DriveImage } from "./customtype";

export class Seeker {
    url: string;
    data: string;
    verbose: boolean;

    /**
     * 
     * @param url url in the format of 'https://drive.google.com/embeddedfolderview?id=_id_#grid'
     * @param verbose if true activates logs during the process to track if everything is working correctly
     * 
     * @returns nothing
     * 
     * builds a class to retrieve google drive's photos from a given folder 
     */
    constructor(url: string, verbose: boolean = false) {
        this.url = url;
        this.data = "";
        this.verbose = verbose;
    }

    /**
     * 
     * @returns a Promise to the array of photos
     */
    downloadPage() {
        return new Promise<DriveImage[]>((resolve, reject) => {
            get(this.url, (res) => {
                if(res.statusCode == 200){
                    this.logging("Page was requested correctly");
                }else{
                    this.logging("Page didn't answer correctly and replied with code " + res.statusCode.toString());
                }
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    this.data += data;
                });
                res.on("end", () => {
                    resolve(this.getPhotos());
                })
            }).on('error', function(err) {
                reject(err);
            });
        })
    }

    getPhotos(){
        this.logging("Getting photos from:" + this.url);

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
                photo.push(new DriveImage(name.innerHTML, a_link, temp.src));
            }
        });

        return photo;

    }

    private logging(text: string){
        if(this.verbose){
            console.log(text);
        }
    }
}