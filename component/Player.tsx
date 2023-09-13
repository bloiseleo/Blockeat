import Coordinates from '@/entity/Coordinates';
import GameObservable from '@/entity/Game';
import { GameConfigs } from '@/entity/GameConfigs';
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  game: GameObservable
}

const Player = ({game}: Props) => {
  
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0
  });

  const movingInterval = useRef<NodeJS.Timeout>();
  const resetPlayer = () => {
    setCoordinates({
      x: game.player.x,
      y: game.player.y,
    });
  }
  useEffect(() => {    
    game.player.onMove((from, to) => {
      setCoordinates(() => to);
    });
    game.player.onRestart(() => {
      clearInterval(movingInterval.current);
      resetPlayer()
    });
    game.on('loseGame', () => {
      clearInterval(movingInterval.current);
    });
    game.on('movePlayer', key => {
      clearInterval(movingInterval.current);
      game.player.move(key);
      game.verifyCollision();
      movingInterval.current = setInterval(() => {
        game.player.move(key);
        game.verifyCollision();
      }, GameConfigs.TIME_BETWEEN_LOOP);
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