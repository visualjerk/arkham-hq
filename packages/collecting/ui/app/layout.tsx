import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import '@arkham-hq/shared-ui/dist/main.css'
import './globals.css'
import { ArkhamHQLogo } from './logo'
import UserMenu from './user/user-menu'

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
