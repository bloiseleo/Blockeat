'use client';

import Player from "@/component/Player";
import { KeyboardEvent, useState } from "react";
import GameObservable from "@/entity/Game";

export default function GameCanvas() {
  const gameObservable = new GameObservable();
  
  const movePlayer = (event: KeyboardEvent<HTMLElement>) => {
    gameObservable.captureKeyPressed(event.key);
  }
  return (
    <main className="min-h-screen relative overflow-hidden" onKeyDown={movePlayer} tabIndex={0}>
      <Player game={gameObservable} ></Player>
    </main>
  )
}
