export class Point {

    x: number;
    y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Point(this.x, this.y);
    }

    diff(x: number, y: number) {
        const dx = (this.x - x) ** 2;
        const dy = (this.y - y) ** 2;
        return Math.sqrt(dx + dy);
    }
}