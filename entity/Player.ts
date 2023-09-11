import BackwardsPolicy from "@/policy/BackwardsPolicy";
import Movable from "./Movable";
export default class Player extends Movable {
    public move(direction: string): void {
        const oldStrategy = this.strategy;
        const backwardsPolicy = new BackwardsPolicy();
        if(oldStrategy == null) {
            return super.move(direction);
        }
        if(backwardsPolicy.canMove(oldStrategy, direction)) {
            return super.move(direction);
        }
        return super.move(oldStrategy.key);
    }
}