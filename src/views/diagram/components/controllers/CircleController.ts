import type Circle from "@/views/diagram/components/shapes/Circle";

export interface CircleControllerOptions {
    shape: Circle,
}

export default class CircleController {

    options: CircleControllerOptions;

    constructor(options: CircleControllerOptions) {
        this.options = options;
    }

}