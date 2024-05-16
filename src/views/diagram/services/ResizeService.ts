import Container from "@/views/diagram/components/Container";

export default class ResizeService {
    static init() {
        window.addEventListener("resize", this.onResize.bind(this));
    }
    static destroy() {
        window.removeEventListener("resize", this.onResize.bind(this));
    }

    static onResize() {
        if (!Container.container) return;
        Container.container.context.canvas.height = innerHeight;
        Container.container.context.canvas.width = innerWidth;
        Container.container.redraw();
    }
}