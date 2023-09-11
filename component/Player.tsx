import Coordinates from '@/entity/Coordinates';
import GameObservable from '@/entity/Game';
import * as EPlayer from '@/entity/Player';
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
  
  useEffect(() => {
    
    game.player.onMove((from, to) => {
      setCoordinates(() => to);
    });
    
    game.on('movePlayer', key => {
      clearInterval(movingInterval.current);
      movingInterval.current = setInterval(() => {
        game.player.move(key);
      }, 50);
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