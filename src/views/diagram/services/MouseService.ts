import {PanService} from "@/views/diagram/services/PanService";
import Container from "@/views/diagram/components/Container";
import type {Drawable} from "@/views/diagram/components/Drawable";
import {AppInstance} from "@/AppInstance";

export class MouseService {
    static x: number = 0;
    static y: number = 0;
    static isDown: boolean = false;
    static isMoved: boolean = false;
    static isClick: boolean = false;
    static mouseEvent?: MouseEvent;
    static pointerEvent?: MouseEvent;

    static init() {
        window.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("click", this.onClick.bind(this));
        window.addEventListener("wheel", this.onWheel.bind(this));
    }

    static destroy() {
        window.removeEventListener("mousedown", this.onMouseDown.bind(this));
        window.removeEventListener("mouseup", this.onMouseUp.bind(this));
        window.removeEventListener("mousemove", this.onMouseMove.bind(this));
        window.removeEventListener("click", this.onClick.bind(this));
        window.removeEventListener("wheel", this.onWheel.bind(this));
    }

    static onWheel(e: WheelEvent) {
        AppInstance.mitt.emit("wheel", e);
    }
    static onMouseDown(e: PointerEvent) {
        AppInstance.mitt.emit("mousedown", e);
        this.isDown = true;
    }

    static onMouseUp(e: PointerEvent) {
        AppInstance.mitt.emit("mouseup", e);
        this.isDown = false;
    }

    static onClick(e: PointerEvent) {
        this.pointerEvent = e;
        if (!this.isMoved) {
            this.isClick = true;
        } else {
            this.isMoved = false;
        }

        AppInstance.mitt.emit("click", e);
    }

    static onMouseMove(e: MouseEvent) {
        this.mouseEvent = e;
        this.x = e.x;
        this.y = e.y;
        if (this.isDown) {
            this.isMoved = true;
        } else {
            this.isMoved = false;
        }
        AppInstance.mitt.emit("mousemove", e);
    }

    static isOnRect(x, y, width, height) {
        return x < this.x && y < this.y && x + width > this.x && y + height > this.y;
    }

    static reset() {
        this.isClick = false;
    }
}