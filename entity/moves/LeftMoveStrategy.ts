import Player from "@/entity/Player";
import Coordinates from "../Coordinates";
import BaseMoveStrategy from "./BaseMoveStrategy";

export default class LeftMoveStrategy extends BaseMoveStrategy {
    calculatePositionForPlayer(player: Player): Coordinates {
        let newPos = player.x - player.speed;
        if(newPos < (player.width * -1)) {
            newPos = window.innerWidth - player.speed;
        }
        return {
            x: newPos,
            y: player.y
        };
    }
}