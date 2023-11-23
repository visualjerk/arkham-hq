import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME, AUTH_HEADER_NAME } from '@arkham-hq/auth-ui'

const authBaseUrl = process.env.AUTH_SERVICE_URL

type User = {
  username: string
}

async function getUser(): Promise<undefined | User> {
  const token = cookies().get(AUTH_COOKIE_NAME)

  if (!token) {
    return
  }

  const response = await fetch(`${authBaseUrl}/user`, {
    headers: {
      [AUTH_HEADER_NAME]: token.value,
    },
  })

  if (!response.ok) {
    return
  }

  return response.json()
}

export default async function Home() {
  const signInLink = `${authBaseUrl}/sign-in`

  const user = await getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Arkham HQ Collecting</h1>
      {user ? (
        <p>Logged in as {user.username}</p>
      ) : (
        <a href={signInLink}>Sign In</a>
      )}
    </main>
  )
}
