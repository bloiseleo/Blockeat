import { Press_Start_2P } from 'next/font/google';
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blockeat',
  description: 'Can you catch them all?',
}

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
      <body className='min-h-screen h-screen bg-slate-950'>{children}</body>
    </html>
  )
}
