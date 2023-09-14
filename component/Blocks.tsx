'use client';
import Block from "@/entity/Block";
import { useEffect, useState } from "react";
import * as BlockComponent from '@/component/Block';
import { useGame } from "@/contexts/GameContext";

export default function Blocks() {
    const game = useGame();
    const [blocks, setBlocks] = useState<Block[]>(game.blocks);
    const refreshBlocks = () => {
        setBlocks([...game.blocks]);
    }
    useEffect(() => {
        game.on('blockAdded', () => refreshBlocks());
        game.on('blockEaten', block => {
            game.removeBlock(block);
            refreshBlocks();
        });
        game.on('refreshBlocks', () => refreshBlocks());
    }, []);
    return(
        <div>
            {blocks.map((block, index) => <BlockComponent.default key={index} block={block}></BlockComponent.default>)}
        </div>
    );
}