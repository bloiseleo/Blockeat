import { Press_Start_2P } from "next/font/google";
import Modal from "../Modal";
import GameObservable from "@/entity/Game";
import { useEffect, useState } from "react";

const pressStart = Press_Start_2P({
    weight: '400',
    subsets: ['latin']
});

interface Props {
    game: GameObservable
}

export default function GameOverModal({ game }: Props) {

    const [show, setShow] = useState(false);

    const continueClick = () => {
        game.restart();
        setShow(false);
        return;
    }

    const notContinueClick = () => {
        window.location.replace('https://github.com/bloiseleo/Blockeat');
        return;
    }

    useEffect(() => {
        game.on('loseGame', () => {
            setShow(true);
        });
    }, []);

    return (
        <>
            {show ? <Modal>
                <div className={`${pressStart.className} h-[100%] flex flex-col justify-around border-solid border-white border`}>
                    <h1 className='text-white text-[3rem] text-center'>GAME OVER</h1>
                    <div>
                        <p className='text-white text-[2rem] m-5 text-center'>Deseja continuar?</p>
                        <ul className='text-white text-[1rem] flex gap-10 justify-center'>
                            <li>
                                <button onClick={continueClick} type="button" className='group/item flex outline-none' autoFocus={true}>
                                    <span className='group-focus/item:block hidden'>{`>`}</span>
                                    <span className='ml-2'> Sim </span>
                                </button>
                            </li>
                            <li>
                                <button onClick={notContinueClick} type="button" className='group/item flex outline-none'>
                                    <span className='group-focus/item:block hidden'>{`>`}</span>
                                    <span className='ml-2'> Não </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal> : null
            }
        </>
    );
}