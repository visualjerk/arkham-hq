'use client'

import { trpc } from '@/app/api/client'
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
        <label className="grid gap-1">
          Username
          <input
            name="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
          />
        </label>
        <label className="grid gap-1">
          Email
          <input
            name="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="grid gap-1">
          Password
          <input
            name="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button
          type="submit"
          className="p-2 bg-indigo-700 text-indigo-100 hover:bg-indigo-800 rounded-sm font-extrabold tracking-wider"
        >
          Sign Up
        </button>
      </fieldset>
    </form>
  )
}
