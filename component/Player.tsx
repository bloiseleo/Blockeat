'use client';
import { useGame } from '@/contexts/GameContext';
import Coordinates from '@/entity/Coordinates';
import { GameConfigs } from '@/entity/GameConfigs';
import React, { useEffect, useRef, useState } from 'react'

const Player = () => {
  const game = useGame();
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0
  });
  const lastMovement = useRef<string>('');
  const movingInterval = useRef<NodeJS.Timeout>();
  const stopMoving = () => {
    clearInterval(movingInterval.current);
  }
  const resetPlayer = () => {
    stopMoving();
    setCoordinates({
      x: game.player.x,
      y: game.player.y,
    });
  }
  const goTo = (from:Coordinates, to: Coordinates) => {
    setCoordinates(() => to);
  }
  useEffect(() => {    
    game.player.onMove(goTo);
    game.player.onRestart(resetPlayer);
    game.on('loseGame', stopMoving);
    game.on('pause', stopMoving)
    game.on('movePlayer', key => {
      stopMoving();
      lastMovement.current = key;
      game.player.move(key);
      game.verifyCollision();
      movingInterval.current = setInterval(() => {
        game.player.move(key);
        game.verifyCollision();
      }, GameConfigs.TIME_BETWEEN_LOOP);
    })
    game.on('unpause', () => {
      game.movePlayer(lastMovement.current);
    })
  }, []);

  return (
    <div
      id='player'
      style={{
        position: 'absolute',
        top: coordinates.y,
        left: coordinates.x,
        width: game.player.width,
        height: game.player.height,
        backgroundColor: 'red'
      }}
    />
  )
}

export default Player