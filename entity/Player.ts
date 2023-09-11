import BackwardsPolicy from "@/policy/BackwardsPolicy";
import Movable from "./Movable";
import PlayerChild from "./PlayerChild";
export default class Player extends Movable {
    private childs: PlayerChild[] = [];

    public move(direction: string): void {
        const oldStrategy = this.strategy;
        const backwardsPolicy = new BackwardsPolicy();
        if(oldStrategy == null) {
            return super.move(direction);
        }
        if(backwardsPolicy.canMove(this, direction)) {
            return super.move(direction);
        }
        return super.move(oldStrategy.key);
    }

    get qtdChilds(): number {
        return this.childs.length;
    }

    addChild(): PlayerChild {
        let father: Movable = this;
        if(this.childs.length > 0) {
            father = this.childs[
                this.childs.length - 1
            ];
        }
        const child = new PlayerChild(
            16,
            16,
            {
                x: 0,
                y: 0
            },
            1,
            null,
            father
        )
        this.childs.push(
            child
        )
        return child;
    }
}