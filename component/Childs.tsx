import GameObservable from "@/entity/Game";
import PlayerChild from "./PlayerChild";
import { useEffect, useState } from "react";
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
        game.on('loseGame', () => {
            refreshChilds();
        })
        game.player.onMove((from, _) =>  {
            const lastOne = game.player.lastChild;
            if(!lastOne) {
                return;
            }
            lastOne.goTo(from);
            refreshChilds();
        });
    }, []);

    return (
        <div>
            {childs.map((child, index) => <PlayerChild child={child} key={index}></PlayerChild>)}
        </div>
    );
}