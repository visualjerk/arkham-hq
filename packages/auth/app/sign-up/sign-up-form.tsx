'use client'

import { trpc } from '@/app/api/client'
import { Button, Input, Label, TextField } from '@arkham-hq/shared-ui'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useUrlWithRedirect } from '../utils/use-url-with-redirect'

export default function SignUpForm() {
  const { mutateAsync: signUp, isLoading } = trpc.signup.useMutation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const confirmSignUpUrl = useUrlWithRedirect(`/confirm-sign-up`)

  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const response = await signUp({
      username,
      email,
      password,
    })

    const contact = response?.CodeDeliveryDetails?.Destination

    confirmSignUpUrl.searchParams.append('username', username)
    if (contact) {
      confirmSignUpUrl.searchParams.append('contact', contact)
    }

    router.push(confirmSignUpUrl.href)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isLoading} className="grid gap-3">
        <TextField>
          <Label>Username</Label>
          <Input
            name="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
          />
        </TextField>
        <TextField>
          <Label>Email</Label>
          <Input
            name="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </TextField>
        <TextField>
          <Label>Password</Label>
          <Input
            name="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </TextField>
        <Button type="submit">Sign Up</Button>
      </fieldset>
    </form>
  )
}
