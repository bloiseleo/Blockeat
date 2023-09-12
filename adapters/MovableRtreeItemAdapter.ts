import Renderable from "@/entity/Renderable";
import RtreeItem from "@/interfaces/RtreeItem";

export default class MovableRtreeItemAdapter {
    constructor(private renderable: Renderable) {}
    adapt(): RtreeItem {
        return {
            minX: this.renderable.x,
            maxX: this.renderable.x + this.renderable.width,
            minY: this.renderable.y,
            maxY: this.renderable.y + this.renderable.height,
            uuid: this.renderable.uuid
        };
    }
    /**
     * Atualize the RtreeItem without changing reference
     * @param item RtreeItem
     * @returns 
     */ 
    atualize(): void {
        const item = this.renderable.item;
        item.minX = this.renderable.x;
        item.maxX = this.renderable.x + this.renderable.width;
        item.minY = this.renderable.y;
        item.maxY = this.renderable.y + this.renderable.height;
    }   
}