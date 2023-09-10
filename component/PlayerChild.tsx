import * as EPlayerChild from "@/entity/PlayerChild";
import { chdir } from "process";
import { useState } from "react";
interface Props {
    child: EPlayerChild.default
}
export default function PlayerChild({child}: Props) {
    const [posX, setPosX] = useState(child.x);
    const [posY, setPosY] = useState(child.y); 
    
    child.root.onMove((from, to) => {
        child.goTo(from);
        setPosX(from.x);
        setPosY(from.y);
    });

    return (
        <div 
        style={{
          position: 'absolute', 
          top: posY,
          left: posX,
          width: child.width,
          height: child.height,
          backgroundColor: 'gray'
        }} />
    );
}