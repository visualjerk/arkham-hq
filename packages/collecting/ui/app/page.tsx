import { PageHeading } from '@arkham-hq/shared-ui'
import { cookies } from 'next/headers'

const baseUrl = process.env.BASE_URL
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
  const signInLink = `${authBaseUrl}/sign-in?redirectTo=${baseUrl}`

  const user = await getUser()

  return (
    <main className="grid gap-10 p-10">
      <PageHeading>Arkham HQ Collecting</PageHeading>
      {user ? (
        <p>Logged in as {user.username}</p>
      ) : (
        <a href={signInLink}>Sign In</a>
      )}
    </main>
  )
}
