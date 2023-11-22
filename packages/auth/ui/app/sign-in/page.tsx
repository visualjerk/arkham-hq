import Link from 'next/link'
import PageHeading from '@/components/page-heading'
import SignInForm from './sign-in-form-server'

export default function SignUpPage() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <PageHeading>Sign In</PageHeading>
      <SignInForm />
      <Link href="/sign-up">Sign Up</Link>
    </main>
  )
}
