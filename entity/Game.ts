import EventEmitter from "events";
import Player from "./Player";
import RBush from 'rbush';
import Block from "./Block";
import { MovesPossible } from "./moves/Moves";
import Coordinates from "./Coordinates";
import MovableRtreeItemAdapter from "@/adapters/MovableRtreeItemAdapter";
import PlayerChild from "./PlayerChild";
import HasUniqueId from "@/interfaces/HasUniqueId";
import PlayerRtreeItemAdapter from "@/adapters/PlayerRtreeItemAdapter";
import CollidingWithTailPolicy from "@/policy/CollidingWithTailPolicy";
import ClientCordinates from "./ClientCordinates";
import CollidingWithBlock from "@/policy/CollidingWithBlock";
import { GameConfigs } from "./GameConfigs";

export default class GameObservable extends EventEmitter{
    
    public readonly possibleMoves: Array<String> = Object.values(MovesPossible);
    public rtree = new RBush();
    private _blocks: {[key: string]: Block} = {};
    private _policys = [
        new CollidingWithTailPolicy(),
        new CollidingWithBlock()
    ];
    constructor(
        public readonly player: Player
    ) {
        super();
    }
    get blocks(): Block[] {
        return Object.values(this._blocks);
    }
    captureKeyPressed(key: string) {
        if(this.possibleMoves.includes(key)) {
            this.emit('movePlayer', key);
        }
    }
    listenChildren(child: PlayerChild) {
        child.onGoto((oldCord, coord, child) => {
            const oldItem = child.item;
            this.rtree.remove(oldItem, (a: any, b: any) => {
                return a.uuid === b.uuid;
            });
            child.atualizeRtreeItem();
            this.rtree.insert(child.item);
        }); 
    }
    addChild() {
        const child = this.player.addChild();
        const movableAdapter = new MovableRtreeItemAdapter(child);
        this.rtree.insert(movableAdapter.adapt());
        this.listenChildren(child);
        this.emit('newChild');
    }
    addBlock() {
        const block = Block.factory({
            x: ClientCordinates.width,
            y: ClientCordinates.height
        });
        const movableAdapter = new MovableRtreeItemAdapter(block);
        this.rtree.insert(movableAdapter.adapt());
        this._blocks[block.uuid] = block;
        this.emit('blockAdded');
    }
    verifyCollision() {
        const movableAdapter = new PlayerRtreeItemAdapter(this.player);
        const playerBoundies = movableAdapter.adapt()
        if(!this.rtree.collides(playerBoundies)) {
            return;
        };
        const collidaded = this.rtree.search(playerBoundies) as HasUniqueId[]; 
        collidaded.forEach(block => {
            this._policys.forEach(policy => {
                policy.apply(this, block);
            })
        })
    }
    removeBlock(block: Block): void {
        delete this._blocks[block.uuid];
        if(this.blocks.length == 0) {
            for(let i = 0; i < 3; i++) {
                this.addBlock();
            }
        }
    }
    restart() {
        this.rtree.clear();
        this._blocks = {};
        this.player.restart();
    }
    start() {
        for(let i = 0; i < GameConfigs.BLOCKS_QUANTITY_AT_START; i++) {
            this.addBlock();
        }
    }
}