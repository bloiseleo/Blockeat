import EventEmitter from "events";
import Player from "./Player";
import PlayerChild from "./PlayerChild";
import { MovesPossible } from "./moves/Moves";
import Coordinates from "./Coordinates";

export default class GameObservable extends EventEmitter{
    
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
    addChild(coordinates: Coordinates) {
        this.emit('newChild', this.player.addChild(coordinates));
    }
}