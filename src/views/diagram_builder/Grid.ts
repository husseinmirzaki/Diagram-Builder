export default class Grid {
    c: CanvasRenderingContext2D;
    cw: number;
    ch: number;

    constructor(c: CanvasRenderingContext2D, cellWidth?: number, cellHeight?: number) {
        this.c = c;
        this.cw = cellWidth || 50;
        this.ch = cellHeight || 50;

        this.c.lineWidth = .06;
        this.c.strokeStyle = "black"
    }

    drawLine(x: number, y: number, tx: number, ty: number) {
        this.c.beginPath();
        this.c.moveTo(x,y);
        this.c.lineTo(tx, ty);
        this.c.stroke();
    }

    draw() {
        for (let i = 0; i < innerWidth; i += this.cw) {
            for (let j = 0; j < innerHeight; j += this.ch) {
                this.drawLine(0, j, innerWidth, j);
                this.drawLine(i, 0, i, innerHeight);
            }
        }
    }
}