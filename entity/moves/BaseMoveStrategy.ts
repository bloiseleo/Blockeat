import ClientCordinates from "../ClientCordinates";
import Coordinates from "../Coordinates";
import Movable from "../Movable";
import MoveStrategy from "./MoveStrategy";

export default abstract class BaseMoveStrategy implements MoveStrategy {
    constructor(private _key: string, private _keyBackwards: string) {} 
    abstract calculatePositionForPlayer(movable: Movable): Coordinates;
    get key(): string {
        return this._key;
    }
    get keyBackwards(): string {
        return this._keyBackwards;
    }
}