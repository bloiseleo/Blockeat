import Player from "@/entity/Player";
import MovableRtreeItemAdapter from "./MovableRtreeItemAdapter";
import RtreeItem from "@/interfaces/RtreeItem";

export default class PlayerRtreeItemAdapter extends MovableRtreeItemAdapter {
    constructor(player: Player) {
        super(player);
    }
    adapt(): RtreeItem {
        const item = super.adapt();
        return {
            minX: item.minX + 1,
            maxX: item.maxX - 1,
            minY: item.minY + 1,
            maxY: item.maxY - 1,
            uuid: item.uuid
        }
    }
}