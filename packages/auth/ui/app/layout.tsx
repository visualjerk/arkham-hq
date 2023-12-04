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
          <div className="md:grid md:grid-cols-2 xl:grid-cols-5 min-h-screen">
            <div className="xl:col-span-3 p-5 md:p-10 lg:p-20 bg-grunge from-teal-700 to-teal-900">
              <ArkhamHQLogo className="md:w-60 h-auto" />
            </div>
            <div className="xl:col-span-2 p-5 md:p-10 lg:p-20">{children}</div>
          </div>
        </body>
      </html>
    </TrpcProvider>
  )
}
