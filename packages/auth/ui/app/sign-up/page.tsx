import Link from 'next/link'
import SignUpForm from './components/sign-up-form'

export default function SignUpPage() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <h1 className="text-xl font-semibold">Sign Up</h1>
      <SignUpForm />
      <Link href="/">Sign In</Link>
    </main>
  )
}
