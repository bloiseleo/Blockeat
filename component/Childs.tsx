'use client';
import PlayerChild from "./PlayerChild";
import { useEffect, useState } from "react";
import * as EPlayerChild from "@/entity/PlayerChild";
import { useGame } from "@/contexts/GameContext";

export default function Childs() {
    const game = useGame();
    const [childs, setChilds] = useState<Array<EPlayerChild.default>>(game.player.childs);
    const refreshChilds = () => {
        setChilds(() => {
            return [...game.player.childs];
        });
    }
    useEffect(() => {
        game.on('newChild', () => {
            refreshChilds();
        });
        game.player.onMove((from, _) =>  {
            const lastOne = game.player.lastChild;
            if(!lastOne) {
                return;
            }
            lastOne.goTo(from);
            refreshChilds();
        });
        game.player.onRestart(() => refreshChilds());
    }, []);

    return (
        <div>
            {childs.map((child, index) => <PlayerChild child={child} key={index}></PlayerChild>)}
        </div>
    );
}