'use client'

import Link from 'next/link'
import SignUpForm from './sign-up-form'
import { PageHeading } from '@arkham-hq/shared-ui'
import { useUrlWithRedirect } from '../utils/use-url-with-redirect'

export default function SignUpPage() {
  const signInUrl = useUrlWithRedirect(`/sign-in`)

  return (
    <main className="grid gap-5 max-w-md">
      <PageHeading>Sign Up</PageHeading>
      <SignUpForm />
      <Link href={signInUrl}>Sign In</Link>
    </main>
  )
}
