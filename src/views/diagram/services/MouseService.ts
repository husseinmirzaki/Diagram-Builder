import {PanService} from "@/views/diagram/services/PanService";
import Container from "@/views/diagram/components/Container";
import type {Drawable} from "@/views/diagram/components/Drawable";

export class MouseService {
    static x: number = 0;
    static y: number = 0;
    static isDown: boolean = false;
    static isMoved: boolean = false;
    static isClick: boolean = false;

    static init() {
        window.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("click", this.onClick.bind(this));
    }

    static destroy() {
        window.removeEventListener("mousedown", this.onMouseDown.bind(this));
        window.removeEventListener("mouseup", this.onMouseUp.bind(this));
        window.removeEventListener("mousemove", this.onMouseMove.bind(this));
        window.removeEventListener("click", this.onClick.bind(this));
    }

    static onMouseDown(e: PointerEvent) {
        this.isDown = true;
    }

    static onMouseUp(e: PointerEvent) {
        this.isDown = false;
    }

    static onClick(e: PointerEvent) {

        if (!this.isMoved) {
            this.isClick = true;
        } else {
            this.isMoved = false;
        }

        Container.container.redraw();
    }

    static onMouseMove(e: MouseEvent) {
        this.x = e.x;
        this.y = e.y;
        if (this.isDown) {
            PanService.x += e.movementX;
            PanService.y += e.movementY;
            this.isMoved = true;
        } else {
            this.isMoved = false;
        }

        Container.container.redraw();
    }

    static isOnRect(x, y, width, height) {
        return x < this.x && y < this.y && x + width > this.x && y + height > this.y;
    }

    static reset() {
        this.isClick = false;
    }
}