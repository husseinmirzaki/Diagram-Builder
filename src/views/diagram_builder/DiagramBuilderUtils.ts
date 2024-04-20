import type {BuiltShapeOptions, DefaultShapeOptions} from "@/views/diagram_builder/DefaultShapeOptions";

export function fillWithColor(c: CanvasRenderingContext2D, color?: string) {
    c.fillStyle = color || "white";
    c.fillRect(0, 0, c.canvas.width, c.canvas.height);
}

export function buildOptions(options?: DefaultShapeOptions): BuiltShapeOptions {
    return {
        width: options?.width || (Math.random() * 50) + 10,
        height: options?.width || (Math.random() * 50) + 10,
        x: options?.x || 0,
        y: options?.y || 0,
        followTheMouse: options?.followTheMouse || false,
    }
}