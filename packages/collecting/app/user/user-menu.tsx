import { LinkButton } from '@arkham-hq/shared-ui'
import { authBaseUrl, baseUrl, getUser } from './user'

export default async function UserMenu() {
  const signInLink = `${authBaseUrl}/sign-in?redirectTo=${baseUrl}`
  const signOutLink = `${authBaseUrl}/sign-out?redirectTo=${baseUrl}`

  const user = await getUser()

  return (
    <div>
      {user ? (
        <div className="flex gap-2 items-center">
          <p className="text-teal-50 text-sm">Welcome {user.username}</p>
          <LinkButton href={signOutLink}>Sign Out</LinkButton>
        </div>
      ) : (
        <LinkButton href={signInLink}>Sign In</LinkButton>
      )}
    </div>
  )
}
