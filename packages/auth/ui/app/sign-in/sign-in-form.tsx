'use client'

import { Button, Input, Label, TextField } from '@arkham-hq/shared-ui'
import { signIn } from './sign-in-action'
import { useFormState, useFormStatus } from 'react-dom'
import { PropsWithChildren } from 'react'
import { useSearchParams } from 'next/navigation'

type FieldsetProps = PropsWithChildren<{}>

function Fieldset({ children }: FieldsetProps) {
  const { pending } = useFormStatus()
  return (
    <fieldset className="grid gap-3" disabled={pending}>
      {children}
    </fieldset>
  )
}

export default function SignInForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  const [state, signInAction] = useFormState(signIn, {
    message: '',
  })

  return (
    <form action={signInAction}>
      <Fieldset>
        <TextField>
          <Label>Username</Label>
          <Input name="username" autoFocus />
        </TextField>
        <TextField>
          <Label>Password</Label>
          <Input name="password" type="password" />
        </TextField>
        <input name="redirectTo" type="hidden" value={redirectTo ?? ''} />
        <Button type="submit">Sign In</Button>
      </Fieldset>
    </form>
  )
}
