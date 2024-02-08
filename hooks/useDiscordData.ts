import { useEffect, useState } from "react";

function loadDiscord() {
    const discordData = { id: localStorage.getItem('discordId') ?? '', username: localStorage.getItem('discordUsername') ?? '', exists: false };
    if (discordData.id != '' && discordData.username != '') {
        discordData.exists = true;
    }
    return discordData;
}

export default function useDiscordData(): [{
    id: string,
    username: string,
    exists: boolean
}, () => void] {
    const [discord, setDiscord] = useState({
        id: '',
        username: '',
        exists: false
    });
    useEffect(() => {
        const discordData = loadDiscord();
        setDiscord(discordData);
    }, []);

    const deleteDiscord = () => {
        localStorage.removeItem('discordId');
        localStorage.removeItem('discordUsername');
        const discordData = loadDiscord();
        setDiscord(discordData);
    };

    return [discord, deleteDiscord];
}