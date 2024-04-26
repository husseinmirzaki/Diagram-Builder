import {Drawable, ShapeStates} from "@/views/diagram/components/Drawable";
import type {Point} from "@/views/diagram/components/Point";
import {PanService} from "@/views/diagram/services/PanService";
import Container from "@/views/diagram/components/Container";
import {RectController} from "@/views/diagram/components/controllers/RectController";
import DrawableService from "@/views/diagram/services/DrawableService";

export interface RectOptions {
    point: Point,
    width: number,
    height: number,
    state?: ShapeStates,
    fill?: any,
    stroke?: any,
    lineWidth?: number,
    controller?: boolean,
    zIndex?: number,
}

export default class Rect extends Drawable {

    options: RectOptions;
    rectController?: RectController;

    constructor(container: Container, options: RectOptions) {
        super(container);
        this.options = Object.assign({
            lineWidth: 1,
        }, options);

        this.zIndex = this.options.zIndex == 0 ? DrawableService.objectCounter++ : -1;

        if (!this.options.fill && !this.options.stroke) {
            this.options.fill = "black";
        }
        if (this.options.controller) {
            this.rectController = new RectController({
                rect: this
            });
        }

    }

    onClick(e: MouseEvent) {
        if (this.options.controller) {
            console.log("onClick", this.id, this.options.state);
            this.options.state = this.options.state == ShapeStates.SELECTED ? ShapeStates.NORMAL : ShapeStates.SELECTED;
            console.log("onClick", this.id, this.options.state);
            if (this.options.state == ShapeStates.SELECTED) {
                DrawableService.activeObject = this;
            } else {
                DrawableService.activeObject = null;
            }
            console.log("onClick", this.id, DrawableService.activeObject);
            Container.redraw();
        }
    }

    getObjectBoundaries(): { x: number; y: number; width: number; height: number } {
        return {
            x: this.options.point.x,
            y: this.options.point.y,
            width: this.options.width,
            height: this.options.height
        };
    }

    render(delta?: number) {

        this.container.rendered++;

        if (DrawableService.activeObject == this) {
            if (this.options.state == ShapeStates.SELECTED && this.rectController) {
                this.rectController.draw();
            } else {
                this.options.state = ShapeStates.NORMAL;
                DrawableService.activeObject = null;
            }
        } else if (DrawableService.activeObject != this && this.options.state == ShapeStates.SELECTED) {
            this.options.state = ShapeStates.NORMAL;
        }

        this.container.context.fillStyle = this.options.fill || "";
        this.container.context.strokeStyle = this.options.stroke;
        this.container.context.lineWidth = this.options.lineWidth || 1;

        if (!this.options.fill) {
            this.container.context.strokeRect(
                (PanService.x + this.options.point!.x) * PanService.z,
                (PanService.y + this.options.point!.y) * PanService.z,
                (this.options.width!) * PanService.z,
                (this.options.height!) * PanService.z
            );
        } else {
            this.container.context.fillRect(
                (PanService.x + this.options.point!.x) * PanService.z,
                (PanService.y + this.options.point!.y) * PanService.z,
                (this.options.width!) * PanService.z,
                (this.options.height!) * PanService.z
            );
        }

        this.container.context.fillStyle = "white";
        this.container.context.font = "10px Consolas";
        this.container.context.fillText(this.id, this.options.point.x + PanService.x, this.options.point.y + PanService.y + 10);

    }
}