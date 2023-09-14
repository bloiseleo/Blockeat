import EventEmitter from "events";
import Player from "./Player";
import RBush from 'rbush';
import Block from "./Block";
import { MovesPossible } from "./moves/Moves";
import MovableRtreeItemAdapter from "@/adapters/MovableRtreeItemAdapter";
import PlayerChild from "./PlayerChild";
import HasUniqueId from "@/interfaces/HasUniqueId";
import PlayerRtreeItemAdapter from "@/adapters/PlayerRtreeItemAdapter";
import CollidingWithTailPolicy from "@/policy/CollidingWithTailPolicy";
import ClientCordinates from "./ClientCordinates";
import CollidingWithBlock from "@/policy/CollidingWithBlock";
import { GameConfigs } from "./GameConfigs";
import { GameStatus } from "./GameStatus";
import { Commands } from "./commands/Commands";
import CommandFactory from "./commands/CommandFactory";

export default class GameObservable extends EventEmitter{
    
    public readonly possibleMoves: Array<string> = Object.values(MovesPossible);
    public readonly possibleCommands: Array<string> = Object.values(Commands);
    public rtree = new RBush();
    private gameState: GameStatus = GameStatus.INITIAL;
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
    static factory() {
        return new GameObservable(new Player({
            x: 0,
            y: 0
        }));
    }
    get status(): GameStatus {
        return this.gameState;
    }
    get blocks(): Block[] {
        return Object.values(this._blocks);
    }
    captureKeyPressed(key: string) {
        if(this.possibleMoves.includes(key)) {
            this.movePlayer(key);
        }
        if(this.possibleCommands.includes(key)) {
            this.executeCommand(key)
        }
    }
    executeCommand(key: string): void {
        const command = CommandFactory(key);
        command.apply(this);
    }
    movePlayer(key: string): void {
        this.emit('movePlayer', key);
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
            for(let i = 0; i < GameConfigs.BLOCKS_QUANTIY_AT_REFRESH; i++) {
                this.addBlock();
            }
        }
    }
    restart() {
        this.rtree.clear();
        this._blocks = {};
        this.emit('refreshBlocks');
        this.player.restart();
        this.start();
        this.emit('restart');
    }
    start() {
        this.gameState = GameStatus.RUNNING;
        for(let i = 0; i < GameConfigs.BLOCKS_QUANTITY_AT_START; i++) {
            this.addBlock();
        }
        this.movePlayer(
            GameConfigs.START_MOVIMENT
        );
        this.emit('start');
    }
    pause() {
        if(
            this.gameState != GameStatus.RUNNING
         ) {
            return;
        }
        this.gameState = GameStatus.PAUSED;
        this.emit('pause');
    }
    unpause() {
        this.gameState = GameStatus.RUNNING;
        this.emit('unpause');
    }
    stop() {
        this.gameState = GameStatus.STOPPED;
        this.emit('loseGame');
    }
}