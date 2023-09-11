import Coordinates from "../Coordinates";
import Movable from "../Movable";

export default interface MoveStrategy {
    /**
     * Calculate the correct new position based on a Player;
     */
    calculatePositionForPlayer(movable: Movable): Coordinates;
    /**
     * Get the key related to the movement
     */
    get key(): string;
    get keyBackwards(): string;
}