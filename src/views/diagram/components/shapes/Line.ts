import type {Point} from "@/views/diagram/components/Point";
import type Container from "@/views/diagram/components/Container";
import {Drawable} from "@/views/diagram/components/Drawable";

export class Line extends Drawable {
    startPoint: Point;
    endPoint: Point;


    constructor(container: Container, startPoint: Point, endPoint: Point) {
        super(container);
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    draw() {
        super.draw();
        this.container.context.beginPath();
        this.container.context.moveTo(this.startPoint.x, this.startPoint.y);
        this.container.context.lineTo(this.endPoint.x, this.endPoint.y);
        this.container.context.stroke()
    }
}