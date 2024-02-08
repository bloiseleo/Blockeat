'use client';
import Modal from "../Modal";
import { useEffect, useState } from "react";
import ModalButton from "./ModalButton";
import { useGame } from "@/contexts/GameContext";
import { useRouter } from "next/navigation";
import useDiscordData from "@/hooks/useDiscordData";

export default function GameOverModal() {
    const [discordData] = useDiscordData();
    const game = useGame();
    const [show, setShow] = useState(false);
    const router = useRouter();

    const continueClick = () => {
        game.restart();
        setShow(false);
        return;
    }

    const notContinueClick = () => {
        router.replace('/');
    }

    useEffect(() => {
        if(!show) {
            return;
        }
        fetch('/play/api', {
            method: 'POST',
            body: JSON.stringify({
                coins: game.eaten,
                discordId: discordData.id,
            })
        })
        .then(res => {
           console.log(res);
        });
    }, [show]);

    return (
        <>
            {show ? <Modal>
                <div className={`h-[100%] flex flex-col justify-around border-solid border-white border`}>
                    <h1 className='text-white text-xl text-center'>GAME OVER</h1>
                    <div>
                        <p className="text-white text-center text-sm">Você comeu {game.eaten} blocos. Quer converter em Chorume Coins? </p>
                    </div>
                    <div>
                        <p className='text-white text-md m-5 text-center'>Deseja continuar?</p>
                        <ul className='text-white text-md flex gap-10 justify-center'>
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