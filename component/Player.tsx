import * as EPlayer from '@/entity/Player';
import React, { useState } from 'react'

type Props = {
  player: EPlayer.default
}

const Player = ({player}: Props) => {
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