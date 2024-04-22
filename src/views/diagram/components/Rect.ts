import {Drawable} from "@/views/diagram/components/Drawable";
import type {Point} from "@/views/diagram/components/Point";
import {PanService} from "@/views/diagram/services/PanService";
import Container from "@/views/diagram/components/Container";
import {MouseService} from "@/views/diagram/services/MouseService";
import {RectController} from "@/views/diagram/components/RectController";
import {AppInstance} from "@/AppInstance";

export interface RectOptions {
    point: Point,
    width: number,
    height: number,
    state?: 0 | 1,
    fill?: any,
    stroke?: any,
    lineWidth?: number,
    controller?: boolean,
}

export default class Rect extends Drawable {

    options: RectOptions;
    rectController?: RectController;

    constructor(container: Container, options: RectOptions) {
        super(container);
        this.options = Object.assign({
            lineWidth: 1,
        }, options);
        if (!this.options.fill && !this.options.stroke) {
            this.options.fill = "black";
        }
        if (this.options.controller) {
            this.rectController = new RectController({
                rect: this
            });
        }

        AppInstance.on("click", this.onClick.bind(this));
    }

    off() {
        AppInstance.on("click", this.onClick.bind(this));
    }

    onClick(e: PointerEvent) {
         if (this.event(true)) {
             this.container.redraw();
         }
    }


    draw(delta?: number) {
        super.draw(delta);


        this.container.context.fillStyle = this.options.fill || "";
        this.container.context.strokeStyle = this.options.stroke;
        this.container.context.lineWidth = this.options.lineWidth || 1;

        if (!this.options.fill) {
            this.container.context.strokeRect(
                PanService.x + this.options.point!.x,
                PanService.y + this.options.point!.y,
                this.options.width!,
                this.options.height!
            );
        } else {
            this.container.context.fillRect(
                PanService.x + this.options.point!.x,
                PanService.y + this.options.point!.y,
                this.options.width!,
                this.options.height!
            );
        }

        if (this.options.state == 1 && this.rectController) {
            this.rectController.draw();
        }
    }

    event(isCheck = false) {
        super.event(isCheck);
        if (
            MouseService.isOnRect(
                this.options.point!.x + PanService.x,
                this.options.point!.y + PanService.y,
                this.options.width,
                this.options.height
            ) &&
            MouseService.isClick
        ) {
            if (!isCheck)
                this.options.state = this.options.state == 1 ? 0 : 1;
            return true;
        }
    }
}