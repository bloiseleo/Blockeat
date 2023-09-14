import AudioEngine from "@/entity/AudioEngine";
import GameObservable from "@/entity/Game";
import { ReactNode, createContext, useContext } from "react";
interface Game {
    game: GameObservable,
    audioEngine: AudioEngine
}
const GameContext = createContext<Game>({} as Game);
interface Props {
    children: ReactNode
}

const game: Game = {
    game: GameObservable.factory(),
    audioEngine: new AudioEngine()
};

export const GameContextProvider = ({children}: Props) => {
    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);

export const useGame = () => {
    const {game} = useGameContext();
    return game;
}

export const useAudioEngine = () => {
    const {audioEngine} = useGameContext();
    return audioEngine;
}