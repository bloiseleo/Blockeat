'use client';

import * as EPlayer from '@/entity/Player';
import Player from "@/component/Player";
import { KeyboardEvent, useEffect, useRef } from "react";
import GameObservable from "@/entity/Game";
import Childs from '@/component/Childs';
import ClientCordinates from '@/entity/ClientCordinates';
import Blocks from '@/component/Blocks';
import GameOverModal from '@/component/Modals/GameOverModal';
import PauseModal from '@/component/Modals/PauseModal';
import StartMenu from '@/component/Modals/StartMenu';

export default function GameCanvas() {

  const gameObservable = new GameObservable(new EPlayer.default({
    x: 0,
    y: 0
  }));

  const mainRef = useRef<HTMLElement>(null);

  const pauseGame = () => {
    gameObservable.pause();
  }

  const focusOnCanvas = () => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const key = event.key.toLowerCase();
    gameObservable.captureKeyPressed(key);
  }

  useEffect(() => {
    gameObservable.on('restart', () => {
      focusOnCanvas()
    })
    gameObservable.on('unpause', () => {
      focusOnCanvas()
    });
    gameObservable.on('start', () => {
      focusOnCanvas()
    })
  }, []);

  return (
    <>
      <main style={{
        width: ClientCordinates.width,
        height: ClientCordinates.height,
        top: '50%',
        transform: 'translateY(-50%)'
      }} ref={mainRef} onBlur={pauseGame} className="p-6 mx-auto border border-red relative overflow-hidden outline-none" onKeyDown={handleKeyDown} tabIndex={0} autoFocus={true}>
        <Player game={gameObservable} ></Player>
        <Childs game={gameObservable}></Childs>
        <Blocks game={gameObservable}></Blocks>
      </main>
      <GameOverModal game={gameObservable}></GameOverModal>
      <PauseModal game={gameObservable}></PauseModal>
      <StartMenu game={gameObservable}></StartMenu>
    </>
  )
}
