import { KeyboardEvent } from 'react'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blockeat',
  description: 'Can you catch them all?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className='min-h-screen h-screen bg-slate-950'>{children}</body>
    </html>
  )
}
