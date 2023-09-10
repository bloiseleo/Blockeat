import Coordinates from "./Coordinates";
import Movable from "./Movable";
import Player from "./Player";
import MoveStrategy from "./moves/MoveStrategy";

export default class PlayerChild extends Movable {
    constructor(
        blockWidth: number,
        blockHeight: number,
        coordinates: Coordinates,
        speedMultiplayer: number = 1,
        moveStrategy: MoveStrategy | null = null,
        private father: Movable
    ) {
        super(
            blockWidth,
            blockHeight,
            coordinates,
            speedMultiplayer,
            moveStrategy
        )
    }
    static factory(qtt: number, father: Player) {
        const childs = []
        for(let i = 0; i < qtt; i++) {
            childs.push(
                new PlayerChild(
                    16,
                    16,
                    {
                        x: father.x,
                        y: father.y + father.height
                    },
                    1,
                    null,
                    father
                )
            );
            father = childs[i];
        }
        return childs;
    }
    get root() {
        return this.father;
    }
}