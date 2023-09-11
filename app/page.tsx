'use client';

import * as EPlayer from '@/entity/Player';
import Player from "@/component/Player";
import { KeyboardEvent } from "react";
import GameObservable from "@/entity/Game";
import Childs from '@/component/Childs';

export default function GameCanvas() {

  const gameObservable = new GameObservable(new EPlayer.default(16, 16, {
    x: 0,
    y: 0
  }));

  const movePlayer = (event: KeyboardEvent<HTMLElement>) => {
    gameObservable.captureKeyPressed(event.key);
  }

  return (
    <main className="min-h-screen relative overflow-hidden" onKeyDown={movePlayer} tabIndex={0}>
      <Player game={gameObservable} ></Player>
      <Childs game={gameObservable}></Childs>
    </main>
  )
}
