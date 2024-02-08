'use client';
import { useRouter } from "next/navigation";

function GrantCode({handleClick}: {handleClick: () => void}) {
    return <>
        <p className="text-white mb-8 text-center">Para conseguir ganhar as suas chorumecoins jogando o Blockeat, você precisa de um passo a mais. Nesse caso, vou pegar o seu DISCORD_ID para conseguir entrar em contato com a API do ChorumeBot e lhe dar as suas devidas coins!</p>
        <button onClick={handleClick} className="text-white cursor-pointer text-xl rounded-lg border-4 p-4 hover:bg-shadowBlack hover:p-8 transition-all hover:text-2xl">
            Clique aqui para entrar com o discord!
        </button >
    </>
}

export default function Page() {
    const router = useRouter();
    const accessToken = async () => {
        const response = await fetch('/discord/api');
        const data = await response.json();
        router.replace(data.url);
    }
    return (
        <div className="flex h-screen flex-col justify-around items-center max-w-[950px] mt-0 mb-0 ml-auto mr-auto">
            <header className='flex flex-col justify-center items-center'>
                <h1 className='text-white'> Blockeat </h1>
                <p className='text-white animate-rainbowMy'> Coma e Cresça!</p>
            </header>
            <main className="flex flex-col gap-4">
                <GrantCode handleClick={accessToken} />
            </main>
        </div>
    );
}