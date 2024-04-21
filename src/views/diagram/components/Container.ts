import {Grid} from "@/views/diagram/components/Grid";
import type {Drawable} from "@/views/diagram/components/Drawable";
import {Point} from "@/views/diagram/components/Point";
import {Line} from "@/views/diagram/components/Line";
import ObjectInitiator from "@/views/diagram/components/ObjectInitiator";
import Rect, {type RectOptions} from "@/views/diagram/components/Rect";
import {MouseService} from "@/views/diagram/services/MouseService";

export default class Container {
    static container: Container;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    drawers: Array<Drawable> = [];

    constructor(canvas: HTMLCanvasElement | string) {
        if (!canvas)
            throw "No Canvas !";
        if (typeof canvas == "string") {
            this.canvas = document.querySelector(canvas);
        } else {
            this.canvas = canvas;
        }

        this.getContext();
        this.resizeCanvas();

        this.drawers = [
            new Grid(this),
            new ObjectInitiator(this),
        ];

        Container.container = this;
    }

    private getContext() {
        this.context = this.canvas.getContext("2d");
    }

    private resizeCanvas() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

    uFill(x?: number, y?: number, width?: number, height?: number, color?: any) {
        if (!color) {
            this.context.clearRect(x || 0, y || 0, width || innerWidth, height || innerHeight);
        } else {
            this.context.fillStyle = color;
            this.context.fillRect(x || 0, y || 0, width || innerWidth, height || innerHeight)
        }
    }

    uLine(x: number, y: number, x1: number, y1: number): Line {
        const point1 = new Point(x, y);
        const point2 = new Point(x1, y1);
        return this.uLineByOption(point1, point2);
    }

    uLineByOption(point1: Point, point2: Point): Line {
        return new Line(this, point1, point2);
    }

    uRect(x: number, y: number, width: number, height: number) {

        const point = new Point(x, y);

        return this.uRectByOption({
            point,
            width,
            height,
            controller: true,
        });
    }

    uRectByOption(options: RectOptions) {
        return new Rect(this, options);
    }


    public draw() {
        this.uFill(null, null, null, null, "#8299c7");
        this.drawers.forEach((drawer) => drawer.draw());
        MouseService.reset();
    }

    public redraw() {
        requestAnimationFrame(this.draw.bind(this));
    }

}