import {Drawable} from "@/views/diagram/components/Drawable";
import {PanService} from "@/views/diagram/services/PanService";
import {MouseService} from "@/views/diagram/services/MouseService";
import type Container from "@/views/diagram/components/Container";
import {AppInstance} from "@/AppInstance";
import App from "@/App.vue";

export interface GridOptions {
    gridSize: number,
    gridColor: any,
    centerGridColor: any,
    lineWidth: number,
    x: number,
    y: number,
}

export class Grid extends Drawable {

    options: GridOptions = {
        gridSize: 50,
        gridColor: "#c7cad3",
        centerGridColor: "#eeeeee",
        lineWidth: 1,
        x: PanService.x,
        y: PanService.y,
    }


    constructor(container: Container) {
        super(container);

        AppInstance.on("mousemove", this.onMouseMove.bind(this));
        AppInstance.on("wheel", this.onWheel.bind(this));
    }

    onMouseMove(e: MouseEvent) {
        if (this.event(true)) {
            this.container.redraw();
        }
    }

    onWheel(e: WheelEvent) {
        this.options.gridSize = Math.min(Math.max(10, this.options.gridSize - e.deltaY / 30), 100);
        console.log(this.options.gridSize);
        this.container.redraw();
    }

    draw(): void {
        super.draw();

        this.container.context.lineWidth = this.options.lineWidth;

        // const px = (innerWidth / 2) - PanService.x ;
        // const py = PanService.y - (innerHeight / 2);
        const dx = PanService.x;
        const dy = PanService.y;
        const rx = dx % this.options.gridSize;
        const ry = dy % this.options.gridSize;


        const possibleRows = Math.max(innerWidth, innerHeight) / this.options.gridSize;
        const centerRow = Math.floor(PanService.x / this.options.gridSize);
        const centerCol = Math.floor(PanService.y / this.options.gridSize);

        if (centerRow <= possibleRows) {
            this.container.context.strokeStyle = this.options.centerGridColor;
            this.container.uLineD(centerRow * this.options.gridSize + rx, 0, centerRow * this.options.gridSize + rx, innerHeight);
        }
        if (centerCol <= possibleRows) {
            this.container.context.strokeStyle = this.options.centerGridColor;
            this.container.uLineD(0, centerCol * this.options.gridSize + ry, innerWidth, centerCol * this.options.gridSize + ry);
        }

        this.container.context.strokeStyle = this.options.gridColor;
        for (let row = 0; row < Math.max(innerWidth, innerHeight) / this.options.gridSize; row++) {
            if (row == centerRow) {
                this.container.uLineD(0, row * this.options.gridSize + ry, innerWidth, row * this.options.gridSize + ry);
            } else if (row == centerCol) {
                this.container.uLineD(row * this.options.gridSize + rx, 0, row * this.options.gridSize + rx, innerHeight);
            } else {
                this.container.uLineD(0, row * this.options.gridSize + ry, innerWidth, row * this.options.gridSize + ry);
                this.container.uLineD(row * this.options.gridSize + rx, 0, row * this.options.gridSize + rx, innerHeight);
            }
        }

        this.container.context.font = "30px Consolas"
        this.container.context.fillStyle = "#000000";
        this.container.context.fillText(`
innerWidth: ${innerWidth} ,
innerHeight: ${innerHeight}`, 100, 100);
        this.container.context.fillText(`
rx: ${rx} ,
ry: ${ry} ,
dx: ${dx} ,
dy: ${dy} ,
        `, 100, 130);
    }

    event(isCheck = false) {
        if (MouseService.isDown) {
            if (isCheck) {
                return true;
            }

            if (MouseService.mouseEvent) {
                PanService.x += MouseService.mouseEvent!.movementX;
                PanService.y += MouseService.mouseEvent!.movementY;
            }

            this.options.x = PanService.x;
            this.options.y = PanService.y;
        }
    }
}