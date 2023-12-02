'use client'

import { trpc } from '@/app/api/client'
import { Button, Input, Label, TextField } from '@arkham-hq/shared-ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useUrlWithRedirect } from '../utils/use-url-with-redirect'

export default function ConfirmSignUpForm() {
  const { mutateAsync: confirmSignUp, isLoading } =
    trpc.confirmSignUp.useMutation()

  const searchParams = useSearchParams()
  const router = useRouter()

  const username = searchParams.get('username')
  const contact = searchParams.get('contact')

  const signInUrl = useUrlWithRedirect(`/sign-in`)

  const [code, setCode] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (username == null) {
      return
    }

    await confirmSignUp({
      username,
      code,
    })

    router.push(signInUrl.href)
  }

  return username == null ? (
    <div>Missing username.</div>
  ) : (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isLoading} className="grid gap-3">
        {contact != null && (
          <p>
            We sent you a confirmation code to <strong>{contact}</strong>
          </p>
        )}
        <TextField>
          <Label>Username</Label>
          <Input name="Username" value={username} readOnly />
        </TextField>
        <TextField>
          <Label>Code</Label>
          <Input
            name="Code"
            value={code}
            autoFocus
            onChange={(event) => setCode(event.target.value)}
          />
        </TextField>
        <Button type="submit">Confirm Sign Up</Button>
      </fieldset>
    </form>
  )
}
