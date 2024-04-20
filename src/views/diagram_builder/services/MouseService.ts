import type Shape from "@/views/diagram_builder/Shape";

export default class MouseService {
    public static mouseMoveEvent?: MouseEvent;
    public static mouseClickEvent?: PointerEvent;

    public static onMouseMove(e: MouseEvent) {
        this.mouseMoveEvent = e;
    }

    public static onMouseClick(e: PointerEvent) {
        this.mouseClickEvent = e;
        console.log(e);
    }


    public static init() {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("click", this.onMouseClick.bind(this));
    }

    public static destroy() {
        window.removeEventListener("mousemove", this.onMouseMove.bind(this));
        window.removeEventListener("click", this.onMouseClick.bind(this));
    }


    public static hasClickedOnShape(shape: Shape): boolean {
        if (!this.mouseClickEvent) return false;
        console.group("Click");
        console.log(shape.options.followTheMouse);
        console.log(this.mouseClickEvent.x, "x=", shape.options.x, "| width=", shape.options.width, "| s=", shape.options.x + shape.options.width);
        console.log(this.mouseClickEvent.y, "y=", shape.options.y, "| height=", shape.options.height, "| s=", shape.options.y + shape.options.height);
        console.groupEnd()
        return shape.options.x < this.mouseClickEvent.x && shape.options.x + shape.options.width > this.mouseClickEvent.x &&
            shape.options.y < this.mouseClickEvent.y && shape.options.y + shape.options.height > this.mouseClickEvent.y;
    }

    static clearFrameEvents() {
        this.mouseClickEvent = null;
    }
}