import MoveStrategy from "@/entity/moves/MoveStrategy";
import Coordinates from "./Coordinates";
import Collidable from "./Collidable";


export default class Player extends Collidable {
    private baseSpeed: number = 10;
    constructor(
        blockWidth: number,
        blockHeight: number,
        coordinates: Coordinates,
        private multiplier: number = 1,
        private moveStrategy: MoveStrategy | null = null
    ) {
        super(blockWidth, blockHeight, coordinates);
    }
    set strategy(moveStrategy: MoveStrategy | null) {
        this.moveStrategy = moveStrategy;
    }
    get strategy() {
        return this.moveStrategy;
    }
    get speed() {
        return this.baseSpeed * this.multiplier;
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
    
}