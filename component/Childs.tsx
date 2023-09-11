import GameObservable from "@/entity/Game";
import PlayerChild from "./PlayerChild";
import { useEffect, useState } from "react";
import * as EPlayerChild from "@/entity/PlayerChild";

interface Props {
    game: GameObservable
}
export default function Childs({game}: Props) {

    const [childs, setChilds] = useState<Array<EPlayerChild.default>>([]);

    useEffect(() => {
        game.on('newChild', child => {
            setChilds(old => {
                const newChilds = old.slice(0);
                newChilds.push(child);
                return newChilds;
            });
        });
    }, []);

    return (
        <div>
            {childs.map((child, index) => <PlayerChild child={child} key={index}></PlayerChild>)}
        </div>
    );
}