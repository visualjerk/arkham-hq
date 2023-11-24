'use client'

import { trpc } from '@/app/api/client'
import { Button } from '@arkham-hq/shared-ui'
import Input from '@/components/input'
import Label from '@/components/label'
import TextField from '@/components/text-field'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function SignUpForm() {
  const { mutateAsync: signUp, isLoading } = trpc.signup.useMutation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const response = await signUp({
      username,
      email,
      password,
    })

    const contact = response?.CodeDeliveryDetails?.Destination

    const queryParams = [`username=${username}`]
    if (contact) {
      queryParams.push(`contact=${contact}`)
    }

    router.push(`/confirm-sign-up?${queryParams.join('&')}`)
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
