'use client';
import { Press_Start_2P } from 'next/font/google';
import './globals.css'
import { GameContextProvider } from '@/contexts/GameContext';

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={pressStart.className}>
      <body className='min-h-screen h-screen bg-stone-900'>
        <GameContextProvider>
          {children}
        </GameContextProvider>
      </body>
    </html>
  )
}
