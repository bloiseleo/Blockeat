import Coordinates from "@/entity/Coordinates";
import * as EPlayerChild from "@/entity/PlayerChild";
import { chdir } from "process";
import { useEffect, useState } from "react";
interface Props {
    child: EPlayerChild.default
}
export default function PlayerChild({child}: Props) {
    const [coordinates, setCoordinates] = useState<Coordinates>({
        x: 0,
        y: 0
    });
    
    useEffect(() => {
        child.root.onMove((from, to) => {
            child.goTo(from);
            setCoordinates(from);
        });
    }, []);

    return (
        <div 
        style={{
          position: 'absolute', 
          top: coordinates.y,
          left: coordinates.x,
          width: child.width,
          height: child.height,
          backgroundColor: 'gray'
        }} />
    );
}