import GameObservable from "../Game";
import Command from "./Command";
import { Commands } from "./Commands";
import PauseCommand from "./PauseCommand";

const commands: {[key: string]: Command} = {};

commands[
    Commands.PAUSE
] = new PauseCommand();

export default function CommandFactory(key: string) {
    if(Object.keys(commands).includes(key)) {
        return commands[key];
    }
    throw new Error(`${key} does not implements a command`);
}