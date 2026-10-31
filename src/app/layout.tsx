import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OXID Cortex Studio — AI Intelligence & Prompt Lab',
  description: 'Bansos AI, Pustaka Prompt Siap Pakai, Tools Radar & Ingestion Threads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
