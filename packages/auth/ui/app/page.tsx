import { AUTH_COOKIE_NAME } from '@/lib/constants'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default function Home() {
  const token = cookies().get(AUTH_COOKIE_NAME)

  return (
    <main className="grid gap-5 max-w-md p-10">
      <h1 className="text-xl font-semibold">Sign In</h1>
      {!!token && (
        <input className="p-2 bg-white" value={token.value} readOnly></input>
      )}
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </main>
  )
}
