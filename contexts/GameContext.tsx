import GameObservable from "@/entity/Game";
import { MutableRefObject, ReactNode, createContext, createRef, useContext, useRef } from "react";

interface Game {
    game: GameObservable,
}

const GameContext = createContext<Game>({} as Game);

interface Props {
    children: ReactNode
}

export const GameContextProvider = ({children}: Props) => {
    return (
        <GameContext.Provider value={{
            game: GameObservable.factory()
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);

export const useGame = () => {
    const {game} = useGameContext();
    return game;
}