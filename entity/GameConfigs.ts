import { MovesPossible } from "./moves/Moves";

export enum GameConfigs {
    BLOCK_WIDTH = 16,
    BLOCK_HEIGHT = 16,
    SPEED = 16,
    BLOCKS_QUANTITY_AT_START = 3,
    BLOCKS_QUANTIY_AT_REFRESH = 3,
    TIME_BETWEEN_LOOP = 50,
    START_MOVIMENT = MovesPossible.RIGHT
}