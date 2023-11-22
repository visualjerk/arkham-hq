'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import Label from '@/components/label'
import TextField from '@/components/text-field'
import { signIn } from './sign-in-action'
import { useFormState, useFormStatus } from 'react-dom'
import { PropsWithChildren } from 'react'

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
  const [state, formAction] = useFormState(signIn, {
    message: '',
  })

  return (
    <form action={formAction}>
      <Fieldset>
        <TextField>
          <Label>Username</Label>
          <Input name="username" autoFocus />
        </TextField>
        <TextField>
          <Label>Password</Label>
          <Input name="password" type="password" />
        </TextField>
        <Button type="submit">Sign In</Button>
      </Fieldset>
    </form>
  )
}
