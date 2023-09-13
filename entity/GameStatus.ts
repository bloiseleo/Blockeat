export enum GameStatus {
    INITIAL, // The game was not started.
    RUNNING, // The game was started.
    PAUSED, // The game was paused.
    UNPAUSE, // The game was unpause and should continue the last movement.
    STOPPED // The game was stopped and it wil need to restart.
}