'use client';

import useDiscordData from "@/hooks/useDiscordData";

export default function DiscordBadge() {
    const [discord, deleteDiscord] = useDiscordData();
    return discord.exists ? <section className="flex absolute top-4 right-4 text-white gap-4">
        <div className="flex flex-col gap-4">
            <span>Discord Id: {discord.id}</span>
            <span>Discord Username: {discord.username}</span>
        </div>
        <button className="bg-red-500 p-4 rounded-lg" onClick={deleteDiscord}>Sair</button>    
    </section> : <></>;
}