import Coordinates from "./Coordinates";

export default class Block {
    constructor(
        private blockWidth: number,
        private blockHeight: number,
        private coordinates: Coordinates
    ) {}

    get x() {
        return this.coordinates.x;
    }
    get y() {
        return this.coordinates.y;
    }
    get width() {
        return this.blockWidth;
    }
    get height() {
        return this.blockHeight;
    }
}