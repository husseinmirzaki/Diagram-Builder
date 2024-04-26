import type {App} from "vue";
import type {Emitter} from "mitt";
import mitt from "mitt";
import {PanService} from "@/views/diagram/services/PanService";
import {MouseService} from "@/views/diagram/services/MouseService";
import KeyboardService from "@/views/diagram/services/KeyboardService";
import ResizeService from "@/views/diagram/services/ResizeService";

export class AppInstance {
    public static app: App;
    public static mitt: Emitter<any>;

    public static init(app: App) {
        this.app = app;
        this.mitt = mitt();
        PanService.init();
        MouseService.init();
        KeyboardService.init();
        ResizeService.init();
    }

    public static on(name: string, fn: (e: any) => void) {
        this.mitt.on(name, fn);
    }

    public static off(name: string, fn: (e: any) => void) {
        this.mitt.off(name, fn);
    }
}