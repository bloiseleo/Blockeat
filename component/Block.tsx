'use client';
import * as Entity from '@/entity/Block';

interface Props {
    block: Entity.default
}

export default function Block({block}: Props) {
    return (
      <div
        id='player'
        style={
            {
                width: block.width,
                height: block.height,
                position: 'absolute',
                top: block.y,
                left: block.x,
                backgroundColor: 'yellow'
            }
        }
      />
    )
  }