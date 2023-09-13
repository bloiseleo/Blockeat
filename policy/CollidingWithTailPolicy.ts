import GameObservable from "@/entity/Game";
import CollidingPolicy from "./CollidingPolicy";
import HasUniqueId from "@/interfaces/HasUniqueId";

export default class CollidingWithTailPolicy implements CollidingPolicy{
    apply(game: GameObservable, collidadedItem: HasUniqueId): void {
        const tail = game.player.childs;
        for(let i = 0; i < tail.length; i++) {
            const block = tail[i];
            if(block.uuid == collidadedItem.uuid) {
                game.stop();
                return;
            }
        }
    }
}