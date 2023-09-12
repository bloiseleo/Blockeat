import Coordinates from "./Coordinates";
import Movable from "./Movable";

export default class PlayerChild extends Movable {
    public goTo(coordinates: Coordinates): void {
        const oldCoordinates = {
            x: this.x,
            y: this.y
        };
        this.x = coordinates.x;
        this.y = coordinates.y;
        this.emitter.emit('goTo', oldCoordinates, coordinates, this);
    }
    onGoto(callback: (oldCoordinates: Coordinates, coordinates: Coordinates, child: PlayerChild) => void) {
        this.emitter.on('goTo', callback);
    }
}