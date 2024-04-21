import Container from "@/views/diagram/components/Container";

export default class ResizeService {
    static init() {
        window.addEventListener("resize", this.onResize.bind(this));
    }
    static destroy() {
        window.removeEventListener("resize", this.onResize.bind(this));
    }

    static onResize() {
        Container.container.context.canvas.height = innerHeight;
        Container.container.context.canvas.width = innerWidth;
        Container.container.draw();
    }
}