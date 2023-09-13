import GameObservable from "../Game";
import Command from "./Command";

export default class PauseCommand implements Command {
    apply(game: GameObservable): void {
        game.pause();
    }
}