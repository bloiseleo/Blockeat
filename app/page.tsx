'use client';

import Block from "@/component/Block";
import * as EntityBlock from '@/entity/Block';
import Player from "@/component/Player";
import * as EntityPlayer from "@/entity/Player";
import MoveFactory from "@/entity/moves/MoveFactory";
import { KeyboardEvent, useState } from "react";

export default function GameCanvas() {
  
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  
  const player = new EntityPlayer.default(
    16,
    16,
    1,
    {x: posX, y: posY}
  );
  
  const coin = new EntityBlock.default(
    16,
    16,
    {x: 10, y: 10}
  );
  
  const movePlayer = (event: KeyboardEvent<HTMLElement>) => {
    player.strategy = MoveFactory(event.key);
    player.move();
    setPosX(() => player.x); 
    setPosY(() => player.y);
  }

  return (
    <main className="min-h-screen relative" onKeyDown={movePlayer} tabIndex={0}>
      <Player player={player}></Player>
      <Block block={coin}></Block>
    </main>
  )
}
