import Link from 'next/link'
import SignUpForm from './sign-up-form'
import PageHeading from '@/components/page-heading'

export default function SignUpPage() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <PageHeading>Sign Up</PageHeading>
      <SignUpForm />
      <Link href="/sign-in">Sign In</Link>
    </main>
  )
}
