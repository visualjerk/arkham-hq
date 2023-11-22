import Link from 'next/link'

export default function Home() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <h1 className="text-xl font-semibold">Sign In</h1>
      <Link href="/sign-up">Sign Up</Link>
    </main>
  )
}
