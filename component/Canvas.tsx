'use client';
import Player from "@/component/Player";
import { KeyboardEvent, useEffect, useRef } from "react";
import Childs from '@/component/Childs';
import ClientCordinates from '@/entity/ClientCordinates';
import Blocks from '@/component/Blocks';
import GameOverModal from '@/component/Modals/GameOverModal';
import PauseModal from '@/component/Modals/PauseModal';
import { useGame, useGameContext } from "@/contexts/GameContext";

export default function Canvas() {
    const ctx = useGameContext();
    const gameObservable = ctx.game;


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
      focusOnCanvas();
      gameObservable.start();
    }, []);
  
    return (
      <>
        <main style={{
          width: ClientCordinates.width,
          height: ClientCordinates.height,
          top: '50%',
          transform: 'translateY(-50%)'
        }} ref={mainRef} onBlur={pauseGame} className="p-6 mx-auto border border-red relative overflow-hidden outline-none" onKeyDown={handleKeyDown} tabIndex={0} autoFocus={true}>
          <Player></Player>
          <Childs></Childs>
          <Blocks></Blocks>
        </main>
        <GameOverModal></GameOverModal>
        <PauseModal></PauseModal>
      </>
    )
}