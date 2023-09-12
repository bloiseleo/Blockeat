import EventEmitter from "events";
import Collidable from "./Collidable";
import Coordinates from "./Coordinates";
import MoveStrategy from "./moves/MoveStrategy";
import MoveFactory from "./moves/MoveFactory";
import { GameConfigs } from "./GameConfigs";

export default abstract class Movable extends Collidable {
    protected emitter: EventEmitter = new EventEmitter();
    protected baseSpeed: number;
    constructor(
        coordinates: Coordinates,
        protected speedMultiplier: number = 1,
        protected moveStrategy: MoveStrategy | null = null
    ) {
        super(
            coordinates
        );
        this.baseSpeed = GameConfigs.SPEED;
    }
    onMove(callback: (from: Coordinates, to: Coordinates) => void) {
        this.emitter.on('move', callback);
    }
    set strategy(moveStrategy: MoveStrategy | null) {
        this.moveStrategy = moveStrategy;
    }
    get strategy() {
        return this.moveStrategy;
    }
    get strategyKind() {
        return this.moveStrategy == null ? null:this.moveStrategy.constructor;
    }
    get speed() {
        return this.baseSpeed * this.speedMultiplier;
    }
    public move(direction: string): void {
        const moveStrategy = MoveFactory(direction);
        const coordinates =  moveStrategy.calculatePositionForPlayer(this);
        const oldCoordinates = {
            x: this.x,
            y: this.y
        };
        this.x = coordinates.x;
        this.y = coordinates.y;
        this.moveStrategy = moveStrategy;
        this.emitter.emit('move', oldCoordinates, coordinates);
    }
}