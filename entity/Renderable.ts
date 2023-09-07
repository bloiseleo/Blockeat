import Coordinates from "./Coordinates";

/**
 * Element that is capable to be renderade.
 */
export default abstract class Renderable {
    constructor(
        protected blockWidth: number,
        protected blockHeight: number,
        protected coordinates: Coordinates
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
    set x(val: number) {
        this.coordinates.x = val;
    }
    set y(val: number) {
        this.coordinates.y = val;
    }
}