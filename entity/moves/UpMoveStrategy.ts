import Player from "@/entity/Player";
import Coordinates from "../Coordinates";
import BaseMoveStrategy from "./BaseMoveStrategy";

export default class UpMoveStrategy extends BaseMoveStrategy {

    calculatePositionForPlayer(player: Player): Coordinates {
        let newPos = player.y - player.speed;
        if(newPos < (player.height * -1)) {
            newPos = window.innerHeight - player.speed;
        }
        return {
            y: newPos,
            x: player.x
        } as Coordinates;
    }

}