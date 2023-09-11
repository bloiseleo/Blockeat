import Player from "@/entity/Player";

export default class BackwardsPolicy {
    canMove(
        player: Player,
        keyPressed: string,
    ): boolean {       
        if(!player.strategy) {
            return true;
        }
        return player.strategy.keyBackwards != keyPressed || player.qtdChilds == 0;
    }
}