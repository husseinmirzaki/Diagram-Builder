import type Container from "@/views/diagram/components/Container";
import {Drawable} from "@/views/diagram/components/Drawable";
import Container from "@/views/diagram/components/Container";
import {Point} from "@/views/diagram/components/Point";
import {PanService} from "@/views/diagram/services/PanService";
import DrawableService from "@/views/diagram/services/DrawableService";

export default class ObjectInitiator extends Drawable {

    drawables: Array<Drawable> = [];


    constructor(container: Container) {
        super(container);

        const padding = 15;
        const width = 50;
        const height = 50;
        const count = 10;

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                let c = this.container.uCircle(
                    (-Math.floor(count / 2) * width) + (i * width) + padding / 2,
                    (-Math.floor(count / 2) * width) + (j * width) + padding / 2,
                    width / 2 - padding,
                );
                c.options.fill = "red";
                c.zIndex = DrawableService.objectCounter++;
                this.drawables.push(c);
            }
        }


        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.drawables.push(this.container.uRectByOption({
                    point: new Point(
                        (-Math.floor(count / 2) * width) + (i * width) + padding / 2,
                        (-Math.floor(count / 2) * height) + (j * height) + padding / 2,
                    ),
                    width: width - padding,
                    height: height - padding,
                    controller: true,
                    zIndex: 0,
                }));
            }
        }
    }

    draw(delta?: number) {
        super.draw(delta);

        this.drawables.sort((a, b) => a.zIndex > b.zIndex ? 1 : a.zIndex < b.zIndex ? -1 : 0).forEach((drawable) => drawable.draw());

    }

}