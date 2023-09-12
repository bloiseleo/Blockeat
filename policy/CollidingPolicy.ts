import GameObservable from "@/entity/Game";
import HasUniqueId from "@/interfaces/HasUniqueId";

export default interface CollidingPolicy {
    apply(game: GameObservable, collidadedItem: HasUniqueId): void;
}