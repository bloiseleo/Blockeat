import ClientCordinates from "../ClientCordinates";
import DownMoveStrategy from "./DownMoveStrategy";
import LeftMoveStrategy from "./LeftMoveStrategy";
import MoveStrategy from "./MoveStrategy";
import { MovesPossible } from "./Moves";
import RightMoveStrategy from "./RightMoveStrategy";
import UpMoveStrategy from "./UpMoveStrategy";

const keyBindings: {[key: string]: MoveStrategy} = {};

keyBindings[
    MovesPossible.UP
] = new UpMoveStrategy(
    MovesPossible.UP,
    MovesPossible.DOWN
);

keyBindings[
    MovesPossible.DOWN
] = new DownMoveStrategy(
    MovesPossible.DOWN,
    MovesPossible.UP
);

keyBindings[
    MovesPossible.LEFT
] = new LeftMoveStrategy(
    MovesPossible.LEFT,
    MovesPossible.RIGHT
);

keyBindings[
    MovesPossible.RIGHT
] = new RightMoveStrategy(
    MovesPossible.RIGHT,
    MovesPossible.LEFT
);


export default function MoveFactory(keyPressed: string): MoveStrategy {
    const keys = Object.keys(keyBindings);
    if(keys.includes(keyPressed)) {
        return keyBindings[keyPressed];
    }
    throw new Error(`${keyPressed} does not implements a Move Strategy`);
}