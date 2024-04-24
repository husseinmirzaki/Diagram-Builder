import Container from "@/views/diagram/components/Container";
import DrawableService from "@/views/diagram/services/DrawableService";
import {makeId} from "@/views/diagram/Uils";

export class Drawable {
    id: string;
    zIndex: number;
    container: Container;


    constructor(container: Container) {
        this.id = makeId(10);
        this.zIndex = -1;
        this.container = container;
    }

    draw(delta?: number): void {
        this.event();
    }

    event(isCheck = false) {
        //
    }
}