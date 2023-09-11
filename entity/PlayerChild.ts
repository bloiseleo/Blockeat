import { randomUUID } from "crypto";
import Coordinates from "./Coordinates";
import Movable from "./Movable";
import Player from "./Player";
import MoveStrategy from "./moves/MoveStrategy";

export default class PlayerChild extends Movable {
    private uuid: number = Math.random();
    constructor(
        blockWidth: number,
        blockHeight: number,
        coordinates: Coordinates,
        speedMultiplayer: number = 1,
        moveStrategy: MoveStrategy | null = null,
        private father: Movable
    ) {
        super(
            blockWidth,
            blockHeight,
            coordinates,
            speedMultiplayer,
            moveStrategy
        )
    }
    set root(movable: Movable) {
        this.father = movable;
    }
    get root() {
        return this.father;
    }
    toString() {
        return this.uuid;
    }
}