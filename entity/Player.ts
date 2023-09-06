import MoveStrategy from "@/entity/moves/MoveStrategy";
import Coordinates from "./Coordinates";
import Block from "./Block";


export default class Player {
    private baseSpeed: number = 10;
    constructor(
        private playerWidth: number,
        private playerHeight: number,
        private multiplier: number = 1,
        private coordinates: Coordinates,
        private moveStrategy: MoveStrategy | null = null
    ) {}
    get x() {
        return this.coordinates.x;
    }
    get y() {
        return this.coordinates.y;
    }
    set x(val: number) {
        this.coordinates.x = val;
    }
    set y(val: number) {
        this.coordinates.y = val;
    }
    set strategy(moveStrategy: MoveStrategy | null) {
        this.moveStrategy = moveStrategy;
    }
    get strategy() {
        return this.moveStrategy;
    }
    public setMultiplier(multiplier: number) {
        this.multiplier = multiplier;
    }
    public move(): void {
        if(this.moveStrategy == null) {
            return;
        }
        const coordinates =  this.moveStrategy.calculatePositionForPlayer(this);
        this.x = coordinates.x;
        this.y = coordinates.y;
    }
    get speed() {
        return this.baseSpeed * this.multiplier;
    }
    get width() {
        return this.playerWidth;
    }
    get height() {
        return this.playerHeight;
    }
    isCollidingWith(block: Block): boolean {
        return (
            this.x < block.x + block.width &&
            this.x + this.width > block.x &&
            this.y < block.y + block.height &&
            this.y + this.height > block.y
        );
    }
}