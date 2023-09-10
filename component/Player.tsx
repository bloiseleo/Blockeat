import GameObservable from '@/entity/Game';
import * as EPlayer from '@/entity/Player';
import React, { useState } from 'react'

type Props = {
  game: GameObservable
}

const Player = ({game}: Props) => {
  
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const player = new EPlayer.default(
    16,
    16,
    {x: posX, y: posY},
  );

  player.onMove((from, to) => {
    setPosX(() => to.x); 
    setPosY(() => to.y);
  });

  game.on('movePlayer', key => {
    setInterval(() => {
      player.move(key);
    }, 100);
  })

  return (
    <div
      id='player'
      style={{
        position: 'absolute',
        top: player.y,
        left: player.x,
        width: player.width,
        height: player.height,
        backgroundColor: 'red'
      }}
    />
  )
}

export default Player