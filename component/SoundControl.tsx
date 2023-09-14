import { useGameContext } from "@/contexts/GameContext";
import { useEffect, useState } from "react";
import SoundIcon from "./Icons/SoundIcon";
import MuteIcon from "./Icons/MuteIcon";

export default function SoundControl() {

    const gameContext = useGameContext();

    const [opacity, setOpacity] = useState(1);
    const [enabled, setEnabled] = useState(gameContext.audioEngine.audioEnabled);
    
    const enableAudio = () => {
        gameContext.audioEngine.enable();
        setEnabled(true);
    }
    const disableAudio = () => {
        gameContext.audioEngine.disabled();
        setEnabled(false);
    } 

    const toggleAudio = () => {
        if(enabled) {
            disableAudio();
            return;
        }
        enableAudio();
    }

    useEffect(() => {
        setTimeout(() => {
            setOpacity(0);
        }, 5000);
    }, []);


    return (
        <div className="absolute bottom-10 right-10 flex">
            <p style={{
                opacity: opacity
            }} className="text-white text-xs mr-5 transition ease-linear"> Clique aqui para { !enabled ? 'habilitar':'desabilitar'} o Som! {`->`} </p>
            <div onClick={toggleAudio} className="animate-bounce cursor-pointer">
                {enabled ? <SoundIcon></SoundIcon> : <MuteIcon></MuteIcon>}
            </div>
        </div>
    );
}