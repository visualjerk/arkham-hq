import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@arkham-hq/shared-ui/dist/main.css'
import './globals.css'
import TrpcProvider from './api/trpc-provider'
import { ArkhamHQLogo } from '@arkham-hq/shared-ui'

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
      <html lang="en" className="bg-stone-100">
        <body className={inter.className}>
          <div className="md:grid md:grid-cols-3 min-h-screen">
            <div className="bg-teal-800 p-10 bg-gradient-to-b from-teal-700 to-teal-900">
              <ArkhamHQLogo />
            </div>
            <div className="md:col-span-2 p-10">{children}</div>
          </div>
        </body>
      </html>
    </TrpcProvider>
  )
}
