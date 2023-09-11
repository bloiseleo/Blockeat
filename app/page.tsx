'use client';

import * as EPlayer from '@/entity/Player';
import Player from "@/component/Player";
import { KeyboardEvent, useEffect, useRef } from "react";
import GameObservable from "@/entity/Game";
import Childs from '@/component/Childs';
import ClientCordinates from '@/entity/ClientCordinates';

export default function GameCanvas() {

  const gameObservable = new GameObservable(new EPlayer.default(16, 16, {
    x: 0,
    y: 0
  }));
  const lastKeyPressed = useRef<string>();
  const mainRef = useRef<HTMLElement>(null);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if(lastKeyPressed.current == event.key ) {
      return;
    }
    lastKeyPressed.current = event.key;
    gameObservable.captureKeyPressed(event.key);
  }

  return (
    <main style={{
      width: ClientCordinates.width,
      height: ClientCordinates.height,
      top: '50%',
      transform: 'translateY(-50%)'
    }} ref={mainRef} className="p-6 mx-auto border border-red relative overflow-hidden" onKeyDown={handleKeyDown} tabIndex={0}>
      <Player game={gameObservable} ></Player>
      <Childs game={gameObservable}></Childs>
    </main>
  )
}
