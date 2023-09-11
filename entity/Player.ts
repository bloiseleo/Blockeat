import BackwardsPolicy from "@/policy/BackwardsPolicy";
import Movable from "./Movable";
import PlayerChild from "./PlayerChild";
import Coordinates from "./Coordinates";
export default class Player extends Movable {
    private _childs: PlayerChild[] = [];
    private lastIndexChanged = -1;

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
        return this._childs.length;
    }

    get childs() {
        return this._childs;
    }

    getChild(index: number) {
        return this._childs[index];
    }

    get lastChild(): PlayerChild | null {
        if(this.lastIndexChanged == -1 || this.lastIndexChanged == 0) {
            this.lastIndexChanged = this.childs.length - 1;
            return this.getChild(this.lastIndexChanged);
        }
        this.lastIndexChanged -= 1;
        return this.getChild(this.lastIndexChanged);
    }

    addChild(coordinates: Coordinates): PlayerChild {
        let father: Movable = this;
        if(this._childs.length > 0) {
            father = this._childs[
                this._childs.length - 1
            ];
        }
        const child = new PlayerChild(
            16,
            16,
            {
                x: coordinates.x,
                y: coordinates.y
            },
            1,
            null,
            father
        )
        this._childs.push(
            child
        )
        return child;
    }
}