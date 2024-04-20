export interface DefaultShapeOptions {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    followTheMouse?: boolean;
}

export interface BuiltShapeOptions extends DefaultShapeOptions {
    width: number;
    height: number;
    x: number;
    y: number;
    clickX?: number;
    clickY?: number;
    followTheMouse: boolean;
}