import type {BuiltShapeOptions, DefaultShapeOptions} from "@/views/diagram_builder/DefaultShapeOptions";
import {buildOptions} from "@/views/diagram_builder/DiagramBuilderUtils";
import MouseService from "@/views/diagram_builder/services/MouseService";

export default class Shape {

    options: BuiltShapeOptions
    c: CanvasRenderingContext2D

    constructor(c: CanvasRenderingContext2D, options?: DefaultShapeOptions) {
        this.c = c;
        this.options = buildOptions(options);
    }

    draw() {
        if (MouseService.hasClickedOnShape(this)) {
            if (this.options.followTheMouse) {
                this.options.followTheMouse = false;
            } else {
                this.options.clickX = MouseService.mouseClickEvent!.x - this.options.x;
                this.options.clickY = MouseService.mouseClickEvent!.y - this.options.y;
                this.options.followTheMouse = true;
            }
        }

        if (this.options.followTheMouse) {
            this.followMouse();
        }

    }

    followMouse() {

        if (!MouseService.mouseMoveEvent) return;

        this.options.x = MouseService.mouseMoveEvent.x - this.options.clickX!;
        this.options.y = MouseService.mouseMoveEvent.y - this.options.clickY!;
    }
}