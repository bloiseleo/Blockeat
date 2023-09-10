import EventEmitter from "events";

export default class GameObservable extends EventEmitter{
    captureKeyPressed(key: string) {
        this.emit('movePlayer', key);
    }
}