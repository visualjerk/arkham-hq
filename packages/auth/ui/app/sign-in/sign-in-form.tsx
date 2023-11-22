'use client'

import { trpc } from '@/app/api/client'
import Button from '@/components/button'
import Input from '@/components/input'
import Label from '@/components/label'
import TextField from '@/components/text-field'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function SignInForm() {
  const { mutateAsync: signIn, isLoading } = trpc.signIn.useMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const response = await signIn({
      username,
      password,
    })

    console.log('signed in', response)

    router.push(`/`)
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
          <Label>Password</Label>
          <Input
            name="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </TextField>
        <Button type="submit">Sign In</Button>
      </fieldset>
    </form>
  )
}
