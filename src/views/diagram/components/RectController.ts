import Rect from "@/views/diagram/components/Rect";
import {Drawable} from "@/views/diagram/components/Drawable";
import type Circle from "@/views/diagram/components/Circle";

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


        const point = this.options.rect.options.point.copy()
        point.x -= this.options.margin! / 2;
        point.y -= this.options.margin! / 2;
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
        this.controllers = [
            this.container.uCircleByOption({
                point,
                radius: 5,
                fill: "red",
                fillHover: "blue",
            })
        ];
    }

    draw(delta?: number) {
        super.draw(delta);

        this.coverRect.draw();
        this.controllers.forEach((drawable) => drawable.draw());
    }


}