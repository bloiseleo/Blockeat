import Player from "@/entity/Player";
import MoveStrategy from "./MoveStrategy";
import Coordinates from "../Coordinates";

export default class UpMoveStrategy implements MoveStrategy {

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