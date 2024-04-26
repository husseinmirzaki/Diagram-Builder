import {MouseService} from "@/views/diagram/services/MouseService";
import {AppInstance} from "@/AppInstance";
import Container from "@/views/diagram/components/Container";

export class PanService {
    public static x: number = innerWidth / 2;
    public static y: number = innerHeight / 2;
    public static z: number = 1;

    public static get mouseX() {
        return MouseService.x - this.x;
    }

    public static get mouseY() {
        return MouseService.y - this.y;
    }

    public static isOnRect(x: number, y: number, width: number, height: number) {
        return MouseService.isOnRect(x + this.x, y + this.y, width, height);
    }

    static init() {
        AppInstance.on("wheel", this.onWheel.bind(this));
        AppInstance.on("mousemove", this.onMouseMove.bind(this));
        AppInstance.on("keydown", this.onKeyDown.bind(this));
    }

    static onWheel(e: WheelEvent) {
        this.z = this.z + ((e.deltaY > 0 ? -1 : 1) / 80);
        Container.container.redraw();
    }

    static onMouseMove(e: MouseEvent) {
        if (MouseService.isDown) {
            if (MouseService.mouseEvent) {
                PanService.x += e.movementX * (1 / PanService.z);
                PanService.y += e.movementY * (1 / PanService.z);
            }
            Container.container.redraw();
        }
    }

    static onKeyDown(e: KeyboardEvent) {
        if (e.code == "Digit0") {
            PanService.z = 1;
            Container.container.redraw();
        }
    }
}