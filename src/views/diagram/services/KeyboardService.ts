import {AppInstance} from "@/AppInstance";

export default class KeyboardService {
    static keyboard?: KeyboardEvent;

    static init() {
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("keypress", this.onKeyPress.bind(this));
    }

    static onKeyUp(e:KeyboardEvent) {
        AppInstance.mitt.emit("keyup", e);
    }
    static onKeyDown(e:KeyboardEvent) {
        AppInstance.mitt.emit("keydown", e);
    }
    static onKeyPress(e:KeyboardEvent) {
        AppInstance.mitt.emit("keypress", e);
    }
}