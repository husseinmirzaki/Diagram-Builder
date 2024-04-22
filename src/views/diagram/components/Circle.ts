import {Drawable} from "@/views/diagram/components/Drawable";
import type {Point} from "@/views/diagram/components/Point";
import {PanService} from "@/views/diagram/services/PanService";
import Container from "@/views/diagram/components/Container";
import {MouseService} from "@/views/diagram/services/MouseService";
import {RectController} from "@/views/diagram/components/RectController";
import {AppInstance} from "@/AppInstance";

export interface CircleOptions {
    point: Point,
    radius: number,
    state?: 0 | 1,
    fill?: any,
    fillHover?: any,
    stroke?: any,
    lineWidth?: number,
    controller?: boolean,
}

export default class Circle extends Drawable {

    options: CircleOptions;
    rectController?: RectController;

    constructor(container: Container, options: CircleOptions) {
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
        AppInstance.on("mousemove", this.onClick.bind(this));
    }

    off() {
        AppInstance.on("click", this.onClick.bind(this));
        AppInstance.on("mousemove", this.onMouseMove.bind(this));
    }

    onClick(e: PointerEvent) {
        if (this.event(true)) {
            this.container.redraw();
        }
    }

    onMouseMove(e: MouseEvent) {
        if (this.event(true)) {
            this.container.redraw();
        }
    }


    draw(delta?: number) {
        super.draw(delta);


        this.container.context.fillStyle = this.options.fill;
        this.container.context.strokeStyle = this.options.stroke;
        this.container.context.lineWidth = this.options.lineWidth || 1;

        this.container.context.beginPath();
        this.container.context.arc(
            this.options.point!.x + PanService.x,
            this.options.point!.y + PanService.y,
            this.options.radius,
            0,
            Math.PI * 2,
            false
        )
        if (!this.options.fill) {
            this.container.context.stroke();
        } else {
            this.container.context.fill();
        }

        if (this.options.state == 1 && this.rectController) {
            this.rectController.draw();
        }
    }

    event(isCheck = false) {
        super.event(isCheck);
        if (MouseService.isOnRect(
            this.options.point!.x + PanService.x,
            this.options.point!.y + PanService.y,
            this.options.width,
            this.options.height
        )) {
            if (MouseService.isClick) {
                if (!isCheck)
                    this.options.state = this.options.state == 1 ? 0 : 1;
            } else if (!MouseService.isDown && this.options.state == 1) {
                this.options.state = this.options.state == 1 ? 0 : 1;
            }
            return true;
        }
    }
}