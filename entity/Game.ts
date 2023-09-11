import EventEmitter from "events";
import Player from "./Player";
import PlayerChild from "./PlayerChild";

export default class GameObservable extends EventEmitter{
    public readonly childs: PlayerChild[] = [];
    constructor(
        public readonly player: Player
    ) {
        super();
    }
    captureKeyPressed(key: string) {
        this.emit('movePlayer', key);
    }
    addChild() {
        let father = this.player;
        if(this.childs.length > 0) {
            father = this.childs[
                this.childs.length - 1
            ];
        }
        const child = new PlayerChild(
            16,
            16,
            {
                x: 0,
                y: 0
            },
            1,
            null,
            father
        )
        this.childs.push(
            child
        )
        this.emit('newChild', child);
    }
}