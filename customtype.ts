export class DriveImage{
    name: string;
    url: string;
    thumb_url: string;

    constructor(name: string, url: string, thumb_url: string){
        this.name = name;
        this.url = url;
        this.thumb_url = thumb_url;
    }
}