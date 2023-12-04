'use client'

import Link from 'next/link'
import { PageHeading } from '@arkham-hq/shared-ui'
import SignInForm from './sign-in-form'
import { useUrlWithRedirect } from '../utils/use-url-with-redirect'

export default function SignUpPage() {
  const signUpUrl = useUrlWithRedirect(`/sign-up`)

  return (
    <main className="grid gap-5 max-w-md">
      <PageHeading>Sign In</PageHeading>
      <SignInForm />
      <Link href={signUpUrl}>Sign Up</Link>
    </main>
  )
}
