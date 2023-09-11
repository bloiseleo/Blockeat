import GameObservable from "@/entity/Game";
import PlayerChild from "./PlayerChild";
import { useEffect, useMemo, useRef, useState } from "react";
import * as EPlayerChild from "@/entity/PlayerChild";

interface Props {
    game: GameObservable
}
export default function Childs({game}: Props) {

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
        for (let index = 0; index < 20; index++) {
        
            game.addChild({
                x: game.player.x,
                y: game.player.y
            });
        }
        
    }, []);

    return (
        <div>
            {childs.map((child, index) => <PlayerChild child={child} key={index}></PlayerChild>)}
        </div>
    );
}