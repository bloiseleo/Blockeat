import Player from "@/entity/Player";
import MoveStrategy from "./MoveStrategy";
import Coordinates from "../Coordinates";
import BaseMoveStrategy from "./BaseMoveStrategy";

export default class DownMoveStrategy extends BaseMoveStrategy {
    calculatePositionForPlayer(player: Player): Coordinates {
        let newPos = player.y + player.speed;
        if(newPos > window.innerHeight) {
            return {
                y: (player.height * -1),
                x: player.x
            }
        }
        return {
            y: newPos,
            x: player.x
        };
    }
}