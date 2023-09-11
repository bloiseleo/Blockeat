import Player from "@/entity/Player";
import Coordinates from "../Coordinates";
import BaseMoveStrategy from "./BaseMoveStrategy";
import ClientCordinates from "../ClientCordinates";

export default class RightMoveStrategy extends BaseMoveStrategy {
    calculatePositionForPlayer(player: Player): Coordinates {
        let newPos = player.x + player.speed;
        if(newPos > ClientCordinates.width) {
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