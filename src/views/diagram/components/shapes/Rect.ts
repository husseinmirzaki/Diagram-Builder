import {Drawable, ShapeStates} from "@/views/diagram/components/Drawable";
import type {Point} from "@/views/diagram/components/Point";
import {PanService} from "@/views/diagram/services/PanService";
import Container from "@/views/diagram/components/Container";
import {MouseService} from "@/views/diagram/services/MouseService";
import {RectController} from "@/views/diagram/components/controllers/RectController";
import {AppInstance} from "@/AppInstance";
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

        AppInstance.on("mousedown", this.onMouseDown.bind(this));
        AppInstance.on("mouseup", this.onMouseUp.bind(this));
    }

    onMouseDown(e: PointerEvent) {

        if (!PanService.isOnRect(this.options.point.x, this.options.point.y, this.options.width, this.options.height))
            return;

        if (!DrawableService.activeObject ) {
            DrawableService.activeObject = this;
        }
    }

    onMouseUp(e: PointerEvent) {

        if (!PanService.isOnRect(this.options.point.x, this.options.point.y, this.options.width, this.options.height))
            return;

        if (DrawableService.activeObject == this && !MouseService.isMoved) {
            this.options.state = this.options.state == ShapeStates.SELECTED ? ShapeStates.NORMAL : ShapeStates.SELECTED;
            this.container.redraw();
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

        if (this.options.state == ShapeStates.SELECTED && this.rectController) {
            this.rectController.draw();
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

    }

    event(isCheck = false) {
        super.event(isCheck);
    }
}