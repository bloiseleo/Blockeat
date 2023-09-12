import HasUniqueId from "@/interfaces/HasUniqueId";
import Coordinates from "./Coordinates";
import uuid from "@/helpers/uuid";
import RtreeItem from "@/interfaces/RtreeItem";
import MovableRtreeItemAdapter from "@/adapters/MovableRtreeItemAdapter";
import { GameConfigs } from "./GameConfigs";

/**
 * Element that is capable to be renderade.
 */
export default abstract class Renderable implements HasUniqueId {
    protected _uuid: string;
    protected rtreeItem: RtreeItem;
    constructor(
        protected coordinates: Coordinates
    ) {
        this._uuid = uuid();
        this.rtreeItem = this.createRtreeItem();
    }
    get uuid() {
        return this._uuid;
    }
    get x() {
        return this.coordinates.x;
    }
    get y() {
        return this.coordinates.y;
    }
    get width() {
        return GameConfigs.BLOCK_WIDTH;
    }
    get height() {
        return GameConfigs.BLOCK_WIDTH;
    }
    set x(val: number) {
        this.coordinates.x = val;
    }
    set y(val: number) {
        this.coordinates.y = val;
    }
    public atualizeRtreeItem() {
        const movableAdapter = new MovableRtreeItemAdapter(this);
        movableAdapter.atualize();   
    }
    private createRtreeItem() {
        const movableAdapter = new MovableRtreeItemAdapter(this);
        return movableAdapter.adapt();
    }
    get item(): RtreeItem {
        return this.rtreeItem;
    }
}