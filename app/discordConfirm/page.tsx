'use client';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function loadDiscordIdAndUsername(code: string): Promise<{
    id: string,
    username: string
}>{
    return new Promise((resolve, reject) => {
        fetch('/discord/api', {
            body: JSON.stringify({
                code
            }),
            method: 'POST'
        })
        .then(res => {
            if(res.status != 200) {
                return reject();
            }
            return res.json();
        })
        .then(data => resolve(data))
    })
}
export default function Page() {
    const params = useSearchParams();
    const router = useRouter();
    const [discordRetrieve, setDiscordRetrieve] = useState({
        loading: true,
        error: false,
        message: ''
    });
    useEffect(() => {
        const code = params.get('code');
        if(code == null || code == '') {
            setDiscordRetrieve({
                error: true,
                loading: false,
                message: 'O código do discord não é válido ou não foi fornecido'
            });
        }
        loadDiscordIdAndUsername(code as string)
        .then(v => {
            localStorage.setItem('discordId', v.id)
            localStorage.setItem('discordUsername', v.username);
            router.push('/')
        })
        .catch(err => console.error(err))
    }, [])

    return <div className="flex h-screen flex-col justify-around items-center max-w-[950px] mt-0 mb-0 ml-auto mr-auto">
        <header className='flex flex-col justify-center items-center'>
            <h1 className='text-white'> Blockeat </h1>
            <p className='text-white animate-rainbowMy'> Coma e Cresça!</p>
        </header>
        <main className="flex flex-col gap-4">
            <p className="text-white animate-pulse">Aguarde enquanto recuperamos o seu Discord ID...</p>
            {discordRetrieve.error ? <p className="bg-red-500 p-4 text-white rounded-lg">{discordRetrieve.message}</p>: <></> }
        </main>
    </div>
}