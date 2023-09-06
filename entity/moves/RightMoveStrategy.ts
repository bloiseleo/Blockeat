import Player from "@/entity/Player";
import MoveStrategy from "./MoveStrategy";
import Coordinates from "../Coordinates";

export default class RightMoveStrategy implements MoveStrategy {
    calculatePositionForPlayer(player: Player): Coordinates {
        let newPos = player.x + player.speed;
        if(newPos > window.innerWidth) {
            return {
                    x: (player.width * -1),
                    y: player.y
            } as Coordinates;
        }
        return {
            x: newPos,
            y: player.y
        } as Coordinates;
    }
}