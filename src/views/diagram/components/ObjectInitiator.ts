import type Container from "@/views/diagram/components/Container";
import {Drawable} from "@/views/diagram/components/Drawable";
import Container from "@/views/diagram/components/Container";
import {Point} from "@/views/diagram/components/Point";
import {AppInstance} from "@/AppInstance";
import ChunkService from "@/views/diagram/services/ChunkService";

export default class ObjectInitiator extends Drawable {

    drawables: Array<Drawable> = [];


    constructor(container: Container) {
        super(container);

        const padding = 15;
        const width = 100;
        const height = 100;
        const count = 2;

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

        AppInstance.on("click" , (e: PointerEvent) => {
            console.log(ChunkService.getPointShapes(e.x, e.y));
        });
    }

    draw(delta?: number) {
        super.draw(delta);

        this.drawables.sort((a, b) => a.zIndex > b.zIndex ? 1 : a.zIndex < b.zIndex ? -1 : 0).forEach((drawable) => drawable.draw());

    }

}