import type Container from "@/views/diagram/components/Container";
import {Drawable} from "@/views/diagram/components/Drawable";
import Container from "@/views/diagram/components/Container";
import {Point} from "@/views/diagram/components/Point";

export default class ObjectInitiator extends Drawable {

    drawables: Array<Drawable> = [];


    constructor(container: Container) {
        super(container);

        this.drawables.push(
            this.container.uRectByOption({
                point: new Point(0,0),
                width: 100,
                height: 100,
                controller: true,
                zIndex: 0,
            }),
        )
    }

    draw(delta?: number) {
        super.draw(delta);

        this.drawables.forEach((drawable) => drawable.draw());

    }

}