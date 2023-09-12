import GameObservable from "@/entity/Game";
import HasUniqueId from "@/interfaces/HasUniqueId";
import CollidingPolicy from "./CollidingPolicy";

export default class CollidingWithBlock implements CollidingPolicy {
    apply(game: GameObservable, collidadedItem: HasUniqueId): void {
        const blocks = game.blocks;
        blocks.forEach(block => {
            if(block.uuid == collidadedItem.uuid) {
                game.addChild();
                game.emit('blockEaten', block);
                return;
            }
        })
    }
}