import Modal from "../Modal";
import GameObservable from "@/entity/Game";
import { useEffect, useState } from "react";
import ModalButton from "./ModalButton";
import { useGame } from "@/contexts/GameContext";

export default function GameOverModal() {
    const game = useGame();
    const [show, setShow] = useState(false);

    const continueClick = () => {
        game.restart();
        setShow(false);
        return;
    }

    const notContinueClick = () => {
        window.location.reload();
    }

    useEffect(() => {
        game.on('loseGame', () => {
            setShow(true);
        });
    }, []);

    return (
        <>
            {show ? <Modal>
                <div className={`h-[100%] flex flex-col justify-around border-solid border-white border`}>
                    <h1 className='text-white text-[3rem] text-center'>GAME OVER</h1>
                    <div>
                        <p className='text-white text-[2rem] m-5 text-center'>Deseja continuar?</p>
                        <ul className='text-white text-[1rem] flex gap-10 justify-center'>
                            <li>
                                <ModalButton onClick={continueClick} text="Sim"/>
                            </li>
                            <li>
                                <ModalButton onClick={notContinueClick} text="Não"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal> : null
            }
        </>
    );
}