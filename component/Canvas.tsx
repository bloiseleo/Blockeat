'use client';
import Player from "@/component/Player";
import { KeyboardEvent, useEffect, useRef } from "react";
import Childs from '@/component/Childs';
import ClientCordinates from '@/entity/ClientCordinates';
import Blocks from '@/component/Blocks';
import GameOverModal from '@/component/Modals/GameOverModal';
import PauseModal from '@/component/Modals/PauseModal';
import { useGameContext } from "@/contexts/GameContext";
import { AudioSoundEffect } from "@/entity/audios/AudioSoundEffect";
import { AudioBackground } from "@/entity/audios/AudioBackground";

export default function Canvas() {
  const ctx = useGameContext();
  const gameObservable = ctx.game;
  const audio = ctx.audioEngine;

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

  const playDeathSound = () => {
    audio.stopCurrentBackgroundMusic();
    audio.playSoundEffect(AudioSoundEffect.DEAD);
  }

  const playBackground = () => {
    audio.stopCurrentBackgroundMusic();
    audio.playBackground(AudioBackground.MAIN);
  }

  const startGame = () => {
    focusOnCanvas();
    gameObservable.start();
    playBackground();
  }

  const restartGame = () => {
    focusOnCanvas();
    playBackground();
  }

  useEffect(() => {
    audio.on('enabled', playBackground);
    gameObservable.on('restart', restartGame);
    gameObservable.on('unpause', focusOnCanvas);
    gameObservable.on('loseGame', playDeathSound);
    startGame();
    return () => {
      audio.removeListener('enabled', playBackground);  
      gameObservable.removeListener('restart', restartGame)
      gameObservable.removeListener('unpause', focusOnCanvas);
      gameObservable.removeListener('loseGame', playDeathSound);
    }
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