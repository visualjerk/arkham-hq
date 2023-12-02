import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@arkham-hq/shared-ui/dist/main.css'
import './globals.css'
import TrpcProvider from './api/trpc-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Armham HQ Auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TrpcProvider>
      <html lang="en" className="bg-slate-100">
        <body className={inter.className}>{children}</body>
      </html>
    </TrpcProvider>
  )
}
