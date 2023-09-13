import BackwardsPolicy from "@/policy/BackwardsPolicy";
import Movable from "./Movable";
import PlayerChild from "./PlayerChild";
export default class Player extends Movable {
    private _childs: {[key: string]: PlayerChild} = {};
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
        return this.childs.length;
    }

    get childs(): PlayerChild[] {
        return Object.values(this._childs);
    }

    getChildByUuid(uuid: string): PlayerChild | undefined {
        return this._childs[uuid];
    }

    getChild(index: number): PlayerChild {
        return this.childs[index];
    }

    get lastChild(): PlayerChild | null {
        if(this.lastIndexChanged == -1 || this.lastIndexChanged == 0) {
            this.lastIndexChanged = this.childs.length - 1;
            return this.getChild(this.lastIndexChanged);
        }
        this.lastIndexChanged -= 1;
        return this.getChild(this.lastIndexChanged);
    }

    addChild(): PlayerChild {
        let last: Movable = this.getChild(this.qtdChilds - 1);
        if(!last) {
            last = this;
        }
        const child = new PlayerChild(
            {
                x: last.x,
                y: last.y
            },
        )
        this._childs[child.uuid] = child;
        return child;
    }
    restart() {
        this._childs = {};
        this.x = 0;
        this.y = 0;
        this.emitter.emit('restart');
    }
    onRestart(callback: () => void) {
        this.emitter.on('restart', callback);
    }
}