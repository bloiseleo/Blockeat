import Block from "@/entity/Block";
import GameObservable from "@/entity/Game";
import { useEffect, useState } from "react";
import * as BlockComponent from '@/component/Block';

interface Props {
    game: GameObservable
}
export default function Blocks({game}: Props) {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const refreshBlocks = () => {
        setBlocks([...game.blocks]);
    }
    useEffect(() => {
        game.on('blockAdded', () => refreshBlocks());
        game.on('blockEaten', block => {
            game.removeBlock(block);
            refreshBlocks();
        });
        game.on('loseGame', () => refreshBlocks());
    }, []);
    return(
        <div>
            {blocks.map((block, index) => <BlockComponent.default key={index} block={block}></BlockComponent.default>)}
        </div>
    );
}