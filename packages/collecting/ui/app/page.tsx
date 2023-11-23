import { cookies } from 'next/headers'

const authBaseUrl = process.env.AUTH_SERVICE_URL

type User = {
  username: string
}

async function getUser(): Promise<undefined | User> {
  const response = await fetch(`${authBaseUrl}/user`, {
    headers: { Cookie: cookies().toString() },
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
