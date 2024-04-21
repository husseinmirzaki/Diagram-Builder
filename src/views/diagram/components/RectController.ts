import type Rect from "@/views/diagram/components/Rect";
import {Drawable} from "@/views/diagram/components/Drawable";
import {Point} from "@/views/diagram/components/Point";

export class RectControllerOptions {
    rect: Rect;
    margin: number;
}

export class RectController extends Drawable {

    options: RectControllerOptions;
    coverRect: Rect;

    constructor(options: RectControllerOptions) {
        super(options.rect.container);
        this.options = Object.assign({
            margin: 10,
        }, options);


        const point = this.options.rect.options.point.copy()
        point.x -= this.options.margin / 2;
        point.y -= this.options.margin / 2;
        this.coverRect = this.options.rect.container.uRectByOption(
            {
                point: point,
                width: this.options.rect.options.width + this.options.margin,
                height: this.options.rect.options.height + this.options.margin,
                fill: null,
                stroke: "white",
                controller: false,
            }
        )
    }

    draw(delta?: number) {
        super.draw(delta);

        this.coverRect.draw();
    }


}