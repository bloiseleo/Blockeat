import Movable from "@/entity/Movable";
import MoveStrategy from "@/entity/moves/MoveStrategy";

export default class BackwardsPolicy {
    canMove(
        oldStrategy: MoveStrategy ,
        keyPressed: string,
    ): boolean {        
        return oldStrategy.keyBackwards != keyPressed;
    }
}