import MouseService from "@/views/diagram_builder/services/MouseService";
import Shape from "@/views/diagram_builder/Shape";

export default class RectShape extends Shape {

    draw() {
        super.draw();
        this.c.fillStyle = "black";
        this.c.fillRect(this.options.x, this.options.y, this.options.width, this.options.height);
    }

}