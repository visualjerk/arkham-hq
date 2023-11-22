import Link from 'next/link'
import ConfirmSignUpForm from './confirm-sign-up-form'
import PageHeading from '@/components/page-heading'

export default function SignUpPage() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <PageHeading>Confirm Sign Up</PageHeading>
      <ConfirmSignUpForm />
      <Link href="/">Sign In</Link>
    </main>
  )
}
