import Link from 'next/link'
import ConfirmSignUpForm from './confirm-sign-up-form'

export default function SignUpPage() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <h1 className="text-xl font-semibold">Confirm Sign Up</h1>
      <ConfirmSignUpForm />
      <Link href="/">Sign In</Link>
    </main>
  )
}
