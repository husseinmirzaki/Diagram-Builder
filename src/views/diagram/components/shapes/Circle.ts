import {Drawable, ShapeStates} from "@/views/diagram/components/Drawable";
import type {Point} from "@/views/diagram/components/Point";
import {PanService} from "@/views/diagram/services/PanService";
import Container from "@/views/diagram/components/Container";
import {AppInstance} from "@/AppInstance";
import CircleController from "@/views/diagram/components/controllers/CircleController";

export interface CircleOptions {
    point: Point,
    radius: number,
    state?: ShapeStates,
    fill?: any,
    fillHover?: any,
    stroke?: any,
    lineWidth?: number,
    controller?: boolean,
}

export default class Circle extends Drawable {

    options: CircleOptions;
    circleController?: CircleController;

    constructor(container: Container, options: CircleOptions) {
        super(container);
        this.options = Object.assign({
            lineWidth: 1,
        }, options);

        if (!this.options.fill && !this.options.stroke) {
            this.options.fill = "black";
        }

        if (this.options.controller) {
            this.circleController = new CircleController({
                shape: this,
            });
        }

        AppInstance.on("click", this.onClick.bind(this));
        AppInstance.on("mousemove", this.onMouseMove.bind(this));

    }

    onClick(e: PointerEvent) {

    }

    onMouseMove(e: MouseEvent) {
        if (!this.options.fillHover) return;
        const diff = this.options.point.diff(PanService.mouseX, PanService.mouseY);
        if (diff >= 0 && diff <= this.options.radius) {
            this.options.state = ShapeStates.HOVERED;
            this.container.redraw();
        } else if (this.options.state == ShapeStates.HOVERED) {
            this.options.state = ShapeStates.NORMAL;
            this.container.redraw();
        }

    }


    getObjectBoundaries(): { x: number; y: number; width: number; height: number } {
        return {
            x: this.options.point.x,
            y: this.options.point.y,
            width: this.options.radius,
            height: this.options.radius
        };
    }

    render(delta?: number) {
        this.container.rendered++;
        this.container.context.fillStyle = this.options.state == ShapeStates.HOVERED ? this.options.fillHover || this.options.fill : this.options.fill;
        this.container.context.strokeStyle = this.options.stroke;
        this.container.context.lineWidth = this.options.lineWidth || 1;

        this.container.context.beginPath();
        this.container.context.arc(
            (this.options.point!.x + PanService.x) * PanService.z,
            (this.options.point!.y + PanService.y) * PanService.z,
            this.options.radius * PanService.z,
            0,
            Math.PI * 2,
            false
        )
        if (!this.options.fill) {
            this.container.context.stroke();
        } else {
            this.container.context.fill();
        }

        if (this.options.state == 1 && this.circleController) {
            // this.circleController.draw();
        }
    }

}