import { useEffect, useState } from "react";
import Modal from "../Modal";
import ModalButton from "./ModalButton";
import { useGame } from "@/contexts/GameContext";
import SoundControl from "../SoundControl";


export default function PauseModal() {
    const [show, setShow] = useState(false);
    const game = useGame();
    
    const unPause = () => {
        game.unpause();
        setShow(false);
    }

    useEffect(() => {
        game.on('pause', () => {
            setShow(true);
        });
    }, []);

    return (
        <>
            {
                show ?
                    <Modal>
                        <div className='h-[100%] flex flex-col justify-around items-center'>
                            <h1 className='text-white text-2xl text-center'> Você ainda está ai? </h1>
                            <ModalButton text='Continuar' onClick={unPause}></ModalButton>
                            <SoundControl></SoundControl>
                        </div>
                    </Modal>
                    :
                    null
            }
        </>
    );
}