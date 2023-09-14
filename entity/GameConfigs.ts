import { MovesPossible } from "./moves/Moves";

export enum GameConfigs {
    BLOCK_WIDTH = 16,
    BLOCK_HEIGHT = 16,
    SPEED = 16,
    BLOCKS_QUANTITY_AT_START = 10,
    BLOCKS_QUANTIY_AT_REFRESH = 5,
    TIME_BETWEEN_LOOP = 50,
    START_MOVIMENT = MovesPossible.RIGHT,
    BACKGROUND_MUSIC_VOLUME = .2,
    SOUND_EFFECT_VOLUME = .5
}