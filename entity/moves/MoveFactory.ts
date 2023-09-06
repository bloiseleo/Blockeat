import DownMoveStrategy from "./DownMoveStrategy";
import LeftMoveStrategy from "./LeftMoveStrategy";
import MoveStrategy from "./MoveStrategy";
import { MovesPossible } from "./Moves";
import RightMoveStrategy from "./RightMoveStrategy";
import UpMoveStrategy from "./UpMoveStrategy";

const keyBindings: {[key: string]: MoveStrategy} = {};

keyBindings[
    MovesPossible.UP
] = new UpMoveStrategy();

keyBindings[
    MovesPossible.DOWN
] = new DownMoveStrategy();

keyBindings[
    MovesPossible.LEFT
] = new LeftMoveStrategy();

keyBindings[
    MovesPossible.RIGHT
] = new RightMoveStrategy();


export default function MoveFactory(keyPressed: string): MoveStrategy | null {
    const keys = Object.keys(keyBindings);
    if(keys.includes(keyPressed)) {
        return keyBindings[keyPressed];
    }
    return null;
}