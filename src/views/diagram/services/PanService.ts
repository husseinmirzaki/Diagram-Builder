import {MouseService} from "@/views/diagram/services/MouseService";

export class PanService {
    public static x: number = innerWidth / 2;
    public static y: number = innerHeight / 2;
    public static activeObject: any;

    public static isOnRect(x: number, y: number, width: number, height: number) {
        return MouseService.isOnRect(x + this.x, y + this.y, width, height);
    }
}