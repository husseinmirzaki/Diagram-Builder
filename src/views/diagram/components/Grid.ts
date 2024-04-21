import {Drawable} from "@/views/diagram/components/Drawable";
import {PanService} from "@/views/diagram/services/PanService";
import {MouseService} from "@/views/diagram/services/MouseService";

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
        gridSize: 30,
        gridColor: "#c7cad3",
        centerGridColor: "#eeeeee",
        lineWidth: 1,
        x: PanService.x,
        y: PanService.y,
    }

    draw(): void {
        super.draw();

        this.container.context.lineWidth = this.options.lineWidth;
        for (let row = 0; row < 400; row++) {
            if (row == 0) {
                this.container.context.strokeStyle = this.options.centerGridColor;
            } else {
                this.container.context.strokeStyle = this.options.gridColor;
            }
            // vertical lines
            this.container.uLine(
                this.options.x - row * this.options.gridSize,
                0,
                this.options.x - row * this.options.gridSize,
                this.options.y
            ).draw();
            this.container.uLine(
                this.options.x + row * this.options.gridSize,
                0,
                this.options.x + row * this.options.gridSize,
                this.options.y
            ).draw();
            this.container.uLine(
                this.options.x - row * this.options.gridSize,
                this.options.y - row * this.options.gridSize,
                this.options.x - row * this.options.gridSize,
                innerHeight,
            ).draw();
            this.container.uLine(
                this.options.x + row * this.options.gridSize,
                this.options.y - row * this.options.gridSize,
                this.options.x + row * this.options.gridSize,
                innerHeight,
            ).draw();

            // horizontal lines
            this.container.uLine(
                0,
                this.options.y - row * this.options.gridSize,
                this.options.x,
                this.options.y - row * this.options.gridSize,
            ).draw();
            this.container.uLine(
                0,
                this.options.y + row * this.options.gridSize,
                this.options.x,
                this.options.y + row * this.options.gridSize,
            ).draw();
            this.container.uLine(
                this.options.x - row * this.options.gridSize,
                this.options.y - row * this.options.gridSize,
                innerWidth,
                this.options.y - row * this.options.gridSize,
            ).draw();
            this.container.uLine(
                this.options.x - row * this.options.gridSize,
                this.options.y + row * this.options.gridSize,
                innerWidth,
                this.options.y + row * this.options.gridSize,
            ).draw();
            // if (this.options.x - row * this.options.gridSize < 0) {
            //     break;
            // }
            // for (let col = 0; col < innerWidth; col += this.options.gridSize) {
            //
            //     this.container.uLine(col, 0, col, innerHeight).draw();
            //     this.container.uLine(0, row, innerWidth, row).draw();
            // }
        }
    }

    event(): void {
        if (MouseService.isDown) {
            this.options.x = PanService.x;
            this.options.y = PanService.y;
        }
    }
}