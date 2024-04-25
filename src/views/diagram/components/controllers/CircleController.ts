import type Circle from "@/views/diagram/components/Circle";

export interface CircleControllerOptions {
    shape: Circle,
}

export default class CircleController {

    options: CircleControllerOptions;

    constructor(options: CircleControllerOptions) {
        this.options = options;
    }

}