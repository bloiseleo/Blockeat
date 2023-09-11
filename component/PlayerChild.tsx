import Coordinates from "@/entity/Coordinates";
import * as EPlayerChild from "@/entity/PlayerChild";
import { chdir } from "process";
import { useEffect, useState } from "react";
interface Props {
    child: EPlayerChild.default
}
export default function PlayerChild({child}: Props) {
    return (
        <div 
        style={{
          position: 'absolute', 
          top: child.y,
          left: child.x,
          width: child.width,
          height: child.height,
          backgroundColor: '#18D968',
          border: '1px solid #27F041'
        }}/>
    );
}