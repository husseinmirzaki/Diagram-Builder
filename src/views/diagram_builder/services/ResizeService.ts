export class ResizeService {
    public static listeners: Record<string, () => void> = {}

    public static onResize() {
        Object.values(this.listeners).forEach((f) => f());
    }

    public static init() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    public static destroy() {
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}