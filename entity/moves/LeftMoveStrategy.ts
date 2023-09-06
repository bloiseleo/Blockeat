import Player from "@/entity/Player";
import MoveStrategy from "./MoveStrategy";
import Coordinates from "../Coordinates";

export default class LeftMoveStrategy implements MoveStrategy {
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