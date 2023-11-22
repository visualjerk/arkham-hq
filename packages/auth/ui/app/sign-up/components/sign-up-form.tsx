'use client'

import { trpc } from '@/app/api/client'
import { FormEvent, useState } from 'react'

export default function SignUpForm() {
  const { mutate: signUp } = trpc.signup.useMutation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    signUp({
      username,
      email,
      password,
    })
  }

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <label className="grid gap-1">
        Username
        <input
          name="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
    </form>
  )
}
