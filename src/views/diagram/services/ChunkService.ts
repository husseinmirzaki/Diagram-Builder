import type {Point} from "@/views/diagram/components/Point";

export default class ChunkService {

    public static chunkSize = 50;
    public static chunks: Array<Array<Array<string>>> = []
    public static shapes: Record<string, Array<number, number>> = {};

    public static init() {
        this.clearChunks();
    }

    public static clearChunks() {
        this.chunks = [];
        for (let i = 0; i < innerWidth; i += this.chunkSize) {
            const chunks = [];
            for (let j = 0; j < innerHeight; j += this.chunkSize) {
                chunks.push([]);
            }
            this.chunks.push(chunks);
        }
    }

    public static addToChunk(id: string, x: number, y: number, width: number, height: number) {

        const isInside = x > 0 && y > 0 && x < innerWidth && y < innerHeight;
        const isPartiallyInside = (x < 0 && x + width > 0) || (y < 0 && y + height > 0);
        const isPartiallyOutside = (x < innerWidth && x + width > innerWidth) || (y < innerHeight && y + width > innerHeight)

        if (!isInside && !isPartiallyInside && !isPartiallyOutside) return;

        let i = Math.floor(x / this.chunkSize);
        let j = Math.floor(y / this.chunkSize);
        const toI = Math.ceil((x + width) / this.chunkSize);
        const toJ = Math.ceil((y + height) / this.chunkSize);
        for (i; i <= toI; i++) {
            for (j; j <= toJ; j++) {
                this.chunks[i][j].push(id);
            }
        }
        console.log("Added", id, this.chunks.slice(Math.floor(x / this.chunkSize), toI));
        console.groupEnd()
    }

    public static removeFromChunk(id: string, x: number, y: number, width: number, height: number) {
    }

    public static getPointShapes(x: number, y: number): Array<string> {

        const i = Math.floor(x / this.chunkSize);
        const j = Math.floor(y / this.chunkSize);
        console.log(i, j)

        return this.chunks[i][j];
    }
}