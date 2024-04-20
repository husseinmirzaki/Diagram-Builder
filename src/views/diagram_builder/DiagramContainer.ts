import {fillWithColor} from "@/views/diagram_builder/DiagramBuilderUtils";
import RectShape from "@/views/diagram_builder/RectShape";
import MouseService from "@/views/diagram_builder/services/MouseService";
import Grid from "@/views/diagram_builder/Grid";

export default class DiagramContainer {
    s: Array<any> = [];
    c: CanvasRenderingContext2D;

    constructor(c: CanvasRenderingContext2D) {
        this.c = c;
    }

    draw(e: number) {
        requestAnimationFrame(this.draw.bind(this))
        fillWithColor(this.c);
        new Grid(this.c).draw();
        this.redrawShapes()

        MouseService.clearFrameEvents();
    }

    build() {

        let shape = new RectShape(this.c, {
            x: 10,
            y: 10,
        });
        this.s.push(shape);
        shape.draw();

        shape = new RectShape(this.c, {
            x: 40,
            y: 40,
        });
        this.s.push(shape);
        shape.draw();

        this.draw(0);
    }

    private redrawShapes() {
        this.s.forEach((s) => s.draw());
    }
}