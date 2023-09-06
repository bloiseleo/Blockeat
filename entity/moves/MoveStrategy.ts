import Player from "@/entity/Player";
import Coordinates from "../Coordinates";

export default interface MoveStrategy {
    /**
     * Calculate the correct new position based on a Player;
     */
    calculatePositionForPlayer(player: Player): Coordinates;
}