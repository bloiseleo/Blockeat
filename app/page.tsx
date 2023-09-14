'use client'
import SoundControl from "@/component/SoundControl";
import { useGameContext } from "@/contexts/GameContext";
import GameObservable from "@/entity/Game";
import { useRouter } from 'next/navigation';

export default function Home() {
    const gameContext = useGameContext();
    const router = useRouter();

    const startGame = () => {
        gameContext.game = GameObservable.factory();
        router.replace('/play');
    }

    return (
        <div className="flex h-screen flex-col justify-around items-center">
            <header className='flex flex-col justify-center items-center'>
                <h1 className='text-white'> Blockeat </h1>
                <p className='text-white animate-rainbowMy'> Coma e Cresça!</p>
            </header>
            <main>
                <nav role="list" className="list-none text-white">
                    <button onClick={startGame} type="button" className='group/item flex outline-none' autoFocus={true}>
                        <span className='group-hover/item:block hidden text-white'>{`>`}</span>
                        <span className='ml-2 text-white'> Play </span>
                    </button>
                </nav>
            </main>
            <SoundControl></SoundControl>
        </div>
    );
}