import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import '@arkham-hq/shared-ui/dist/main.css'
import './globals.css'
import UserMenu from './user/user-menu'
import { ArkhamHQLogo } from '@arkham-hq/shared-ui'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontSerif = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Arkham HQ Collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Patch fetch cache revalidate with ISR
  // @see https://open-next.js.org/common_issues/isr#patch-fetch-behaviour-for-isr-only-for-next1351
  const asyncStorage = require('next/dist/client/components/static-generation-async-storage.external')
  //@ts-ignore
  const staticStore =
    (fetch as any).__nextGetStaticStore?.() ||
    asyncStorage.staticGenerationAsyncStorage
  const store = staticStore.getStore()
  store.isOnDemandRevalidate =
    store.isOnDemandRevalidate && !(process.env.OPEN_NEXT_ISR === 'true')

  return (
    <html lang="en" className="bg-stone-100">
      <body className={`${fontSans.variable} ${fontSerif.variable} font-sans`}>
        <header className="sticky top-0 px-3 py-2 bg-teal-800">
          <div className="max-w-screen-xl m-auto flex items-center justify-between">
            <ArkhamHQLogo />
            <UserMenu />
          </div>
        </header>
        <main className="px-3">
          <div className="max-w-screen-xl m-auto">{children}</div>
        </main>
      </body>
    </html>
  )
}
