import Container from "@/views/diagram/components/Container";
import {makeId} from "@/views/diagram/Uils";
import {PanService} from "@/views/diagram/services/PanService";
import {AppInstance} from "@/AppInstance";
import {MouseService} from "@/views/diagram/services/MouseService";

export enum ShapeStates {
    NORMAL,
    SELECTED,
    HOVERED,
}

export class Drawable {
    id: string;
    zIndex: number;
    container: Container;

    constructor(container: Container) {
        this.id = makeId(10);
        this.zIndex = -1;
        this.container = container;

        AppInstance.on("click", this.onGlobalClick.bind(this));
    }

    draw(delta?: number): void {
        if (this.shouldRender()) {
            this.render(delta);
        }
    }

    render(delta?: number) {
    }

    getObjectBoundaries(): { x: number, y: number, width: number, height: number } {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    }

    shouldRender(): boolean {
        const b = this.getObjectBoundaries();
        const x = (b.x + PanService.x) * PanService.z;
        const y = (b.y + PanService.y) * PanService.z;
        return x > -b.width * PanService.z && x < innerWidth + b.width * PanService.z && y > -b.height * PanService.z && y < innerHeight + b.height * PanService.z;
    }

    onGlobalClick(e: PointerEvent) {
        const b = this.getObjectBoundaries();
        if (PanService.isOnRect(b.x, b.y, b.width, b.height)) {
            if (!MouseService.isMoved) {
                this.onClick(e);
            }
        }
    }

    onClick(e: PointerEvent) {
    }
}
