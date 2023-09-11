import EventEmitter from "events";
import Player from "./Player";
import PlayerChild from "./PlayerChild";
import { MovesPossible } from "./moves/Moves";

export default class GameObservable extends EventEmitter{
    public readonly childs: PlayerChild[] = [];
    public readonly possibleMoves: Array<String> = Object.values(MovesPossible);
    constructor(
        public readonly player: Player
    ) {
        super();
    }
    captureKeyPressed(key: string) {
        if(this.possibleMoves.includes(key)) {
            this.emit('movePlayer', key);
        }
    }
    addChild() {
        this.emit('newChild', this.player.addChild());
    }
}