'use client'

import { trpc } from '@/app/api/client'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function ConfirmSignUpForm() {
  const { mutateAsync: confirmSignUp, isLoading } =
    trpc.confirmSignUp.useMutation()

  const searchParams = useSearchParams()

  const username = searchParams.get('username')
  const contact = searchParams.get('contact')

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
        <label className="grid gap-1">
          Username
          <input name="Username" value={username} readOnly />
        </label>
        <label className="grid gap-1">
          Code
          <input
            name="Code"
            value={code}
            autoFocus
            onChange={(event) => setCode(event.target.value)}
          />
        </label>
        <button
          type="submit"
          className="p-2 bg-indigo-700 text-indigo-100 hover:bg-indigo-800 rounded-sm font-extrabold tracking-wider"
        >
          Confirm Sign Up
        </button>
      </fieldset>
    </form>
  )
}
