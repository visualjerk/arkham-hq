import { LinkButton, PageHeading } from '@arkham-hq/shared-ui'
import { cookies } from 'next/headers'
import { getPacks } from './packs'
import PackList from './pack-list'

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
  const signOutLink = `${authBaseUrl}/sign-out?redirectTo=${baseUrl}`

  const user = await getUser()
  const packs = await getPacks()

  return (
    <main className="grid gap-10 p-10">
      <PageHeading>Arkham HQ Collecting</PageHeading>
      {user ? (
        <div>
          <p className="mb-4">Logged in as {user.username}</p>
          <LinkButton href={signOutLink}>Sign Out</LinkButton>
        </div>
      ) : (
        <div>
          <p className="mb-4">Welcome to Arkham HQ! Please sign in.</p>
          <LinkButton href={signInLink}>Sign In</LinkButton>
        </div>
      )}
      <PackList packs={packs} />
    </main>
  )
}
