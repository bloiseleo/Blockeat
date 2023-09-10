import Coordinates from "../Coordinates";
import Movable from "../Movable";

export default interface MoveStrategy {
    /**
     * Calculate the correct new position based on a Player;
     */
    calculatePositionForPlayer(movable: Movable): Coordinates;
}