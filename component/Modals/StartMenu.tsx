import { useState } from "react";
import Modal from "../Modal";
import ModalButton from "./ModalButton";
import GameObservable from "@/entity/Game";

interface Props {
    game: GameObservable
}

export default function StartMenu({game}: Props) {
    const [show, setShow] = useState(true);

    const startGame = () => {
        game.start();
        setShow(false);
    }

    return (
        <>
            {show ? <Modal>
                <div className={`h-[100%] flex flex-col justify-around border-solid border-white border`}>
                    <header className='flex flex-col justify-center items-center'>
                        <h1 className='text-white'> Blockeat </h1>
                        <p className='text-white animate-rainbowMy'> Coma e Cresça!</p>
                    </header>
                    <nav role='list' className='flex flex-col items-center'>
                        <ModalButton onClick={startGame} text='PLAY'></ModalButton>
                    </nav>
                </div>
            </Modal> :
                null}
        </>
    );
}