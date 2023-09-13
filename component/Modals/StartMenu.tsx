import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import ModalButton from "./ModalButton";
import GameObservable from "@/entity/Game";
import MuteIcon from "../Icons/MuteIcon";
import SoundIcon from "../Icons/SoundIcon";

interface Props {
    game: GameObservable
}

export default function StartMenu({ game }: Props) {
    const [show, setShow] = useState(true);
    const [playingSound, setPlayingSoud] = useState(false);

    const startGame = () => {
        game.start();
        setShow(false);
    }

    const toggleSound = () => {
        setPlayingSoud(old => !old);
    }

    useEffect(() => {
        if(playingSound) {
            const audio = new Audio('menu.mp3');
            audio.loop = true;
            audio.volume = 0.2;
            audio.play();
        }
    }, [playingSound]);

    return (
        <>
            {show ? <Modal>
                <div className={`h-[100%] relative flex flex-col justify-around border-solid border-white border`}>
                    <header className='flex flex-col justify-center items-center'>
                        <h1 className='text-white'> Blockeat </h1>
                        <p className='text-white animate-rainbowMy'> Coma e Cresça!</p>
                    </header>
                    <nav role='list' className='flex flex-col items-center'>
                        <ModalButton onClick={startGame} text='PLAY'></ModalButton>
                    </nav>
                    <div className="absolute bottom-5 right-5 animate-bounce cursor-pointer" onClick={toggleSound}>
                        {playingSound ? <MuteIcon></MuteIcon>:<SoundIcon></SoundIcon>}
                    </div>
                </div>
            </Modal> :
                null}
        </>
    );
}