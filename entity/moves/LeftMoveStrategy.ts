import Player from "@/entity/Player";
import Coordinates from "../Coordinates";
import BaseMoveStrategy from "./BaseMoveStrategy";
import ClientCordinates from "../ClientCordinates";

export default class LeftMoveStrategy extends BaseMoveStrategy {
    calculatePositionForPlayer(player: Player): Coordinates {
        let newPos = player.x - player.speed;
        if(newPos < (player.width * -1)) {
            newPos = ClientCordinates.width - player.speed;
        }
        return {
            x: newPos,
            y: player.y
        };
    }
}