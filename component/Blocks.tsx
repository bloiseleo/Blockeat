'use client';
import Block from "@/entity/Block";
import { useEffect, useState } from "react";
import * as BlockComponent from '@/component/Block';
import { useGameContext } from "@/contexts/GameContext";
import { AudioSoundEffect } from "@/entity/audios/AudioSoundEffect";

export default function Blocks() {
    const ctx = useGameContext();
    const game = ctx.game;
    const audio = ctx.audioEngine;
    const [blocks, setBlocks] = useState<Block[]>(game.blocks);
    const refreshBlocks = () => {
        setBlocks([...game.blocks]);
    }
    const eatBlock = (block: Block) => {
        audio.playSoundEffect(AudioSoundEffect.BLOCK_EATEN);
        game.removeBlock(block);
        refreshBlocks();
    }
    useEffect(() => {
        game.on('blockAdded', refreshBlocks);
        game.on('blockEaten', eatBlock);
        game.on('refreshBlocks', refreshBlocks);
        return () => {
            game.removeListener('blockAdded', refreshBlocks);
            game.removeListener('blockEaten', eatBlock);
            game.removeListener('refreshBlocks', refreshBlocks);
        }
    }, []);
    return (
        <div>
            {blocks.map((block, index) => <BlockComponent.default key={index} block={block}></BlockComponent.default>)}
        </div>
    );
}