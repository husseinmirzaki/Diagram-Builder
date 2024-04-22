import type {App} from "vue";
import type {Emitter} from "mitt";
import mitt from "mitt";

export class AppInstance {
    public static app: App;
    public static mitt: Emitter<any>;

    public static init(app: App) {
        this.app = app;
        this.mitt = mitt();
    }

    public static on(name: string, fn: (e: any) => void) {
        this.mitt.on(name, fn);
    }

    public static off(name: string, fn: (e: any) => void) {
        this.mitt.off(name, fn);
    }
}