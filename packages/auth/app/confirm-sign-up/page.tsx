import Link from 'next/link'
import ConfirmSignUpForm from './confirm-sign-up-form'
import { PageHeading } from '@arkham-hq/shared-ui'

export default function SignUpPage() {
  return (
    <main className="grid gap-5 max-w-md">
      <PageHeading>Confirm Sign Up</PageHeading>
      <ConfirmSignUpForm />
      <Link href="/sign-up">Sign Up</Link>
    </main>
  )
}
