import GameObservable from "../Game";

export default interface Command {
    apply(game: GameObservable): void;
}