import Link from 'next/link'
import { PageHeading } from '@arkham-hq/shared-ui'
import SignInForm from './sign-in-form'

export default function SignUpPage() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <PageHeading>Sign In</PageHeading>
      <SignInForm />
      <Link href="/sign-up">Sign Up</Link>
    </main>
  )
}
