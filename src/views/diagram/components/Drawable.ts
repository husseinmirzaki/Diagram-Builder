import Container from "@/views/diagram/components/Container";

export class Drawable {
    container: Container;


    constructor(container: Container) {
        this.container = container;
    }

    draw(delta?: number): void {
        this.event();
    }

    event() {
    }
}