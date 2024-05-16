import {Grid} from "@/views/diagram/components/Grid";
import type {Drawable} from "@/views/diagram/components/Drawable";
import {Point} from "@/views/diagram/components/Point";
import {Line} from "@/views/diagram/components/shapes/Line";
import ObjectInitiator from "@/views/diagram/components/ObjectInitiator";
import Rect, {type RectOptions} from "@/views/diagram/components/shapes/Rect";
import {MouseService} from "@/views/diagram/services/MouseService";
import type {CircleOptions} from "@/views/diagram/components/shapes/Circle";
import Circle from "@/views/diagram/components/shapes/Circle";
import ChunkService from "@/views/diagram/services/ChunkService";

export default class Container {
    static container: Container;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    time: number = 0;
    rendered: number = 0;

    drawers: Array<Drawable> = [];

    constructor(canvas: HTMLCanvasElement | string) {
        if (typeof canvas == "string") {
            let canvas1 = document.querySelector(canvas);

            if (!canvas1) {
                throw "No Canvas !";
            }

            this.canvas = canvas1 as HTMLCanvasElement;
        } else {
            this.canvas = canvas;
        }
        if (!this.canvas)
            throw "No Canvas !";

        this.context = this.canvas.getContext("2d");
        this.resizeCanvas();

        this.drawers = [
            new Grid(this),
            new ObjectInitiator(this),
        ];

        Container.container = this;
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

    uLineD(x: number, y: number, x1: number, y1: number): Line {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x1, y1);
        this.context.stroke();
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

    uCircle(x: number, y: number, radius: number) {

        const point = new Point(x, y);

        return this.uCircleByOption({
            point,
            radius
        });
    }

    uCircleByOption(options: CircleOptions) {
        return new Circle(this, options);
    }


    public draw(e: number) {
        ChunkService.clearChunks();
        this.rendered = 0;
        const delta = e - this.time;
        this.time = e;
        this.uFill(
            undefined,
            undefined,
            undefined,
            undefined,
            "#7896c2"
        );
        this.drawers.forEach((drawer) => drawer.draw());
        MouseService.reset();
    }

    public redraw() {
        requestAnimationFrame(this.draw.bind(this));
    }

    public static redraw() {
        if (this.container) {
            this.container.redraw();
        }
    }
}