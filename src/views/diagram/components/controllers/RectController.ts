import Rect from "@/views/diagram/components/shapes/Rect";
import {Drawable} from "@/views/diagram/components/Drawable";
import type Circle from "@/views/diagram/components/shapes/Circle";
import type {Point} from "@/views/diagram/components/Point";

export interface RectControllerOptions {
    rect: Rect;
    margin?: number;
}

export class RectController extends Drawable {

    options: RectControllerOptions;
    coverRect: Rect;
    controllers: Array<Circle> = [];

    constructor(options: RectControllerOptions) {
        super(options.rect.container);
        this.options = Object.assign({
            margin: 10,
        }, options);
        const hm = this.options.margin! / 2;

        let point = this.options.rect.options.point.copy()
        point.x -= hm;
        point.y -= hm;
        this.coverRect = this.options.rect.container.uRectByOption({
                point: point,
                width: this.options.rect.options.width + (this.options.margin || 0),
                height: this.options.rect.options.height + (this.options.margin || 0),
                lineWidth: 1,
                fill: null,
                stroke: "white",
                controller: false,
            }
        )
        this.addCircleController(point);

        point = this.options.rect.options.point.copy()
        point.x += this.options.rect.options.width + hm;
        point.y += this.options.rect.options.height + hm;
        this.addCircleController(point);

        point = this.options.rect.options.point.copy()
        point.x -= hm;
        point.y += this.options.rect.options.height + hm;
        this.addCircleController(point);

        point = this.options.rect.options.point.copy()
        point.x += this.options.rect.options.width + hm;
        point.y += this.options.rect.options.height + hm;
        this.addCircleController(point);

        point = this.options.rect.options.point.copy()
        point.x += this.options.rect.options.width + hm;
        point.y -= hm;
        this.addCircleController(point);
    }

    addCircleController(point: Point) {
        this.controllers.push(
            this.container.uCircleByOption({
                point,
                radius: 5,
                fill: "red",
                fillHover: "blue",
            })
        );
    }

    draw(delta?: number) {
        super.draw(delta);

        this.coverRect.draw();
        this.controllers.forEach((drawable) => drawable.draw());
    }


}