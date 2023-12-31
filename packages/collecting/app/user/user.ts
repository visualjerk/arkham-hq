import { cookies } from 'next/headers'
import { z } from 'zod'

export const baseUrl = process.env.BASE_URL
export const authBaseUrl = process.env.AUTH_SERVICE_URL

export const UserSchema = z.object({
  username: z.string(),
})

export type User = z.infer<typeof UserSchema>

export const USER_TAG = 'user'

export async function getUser(): Promise<undefined | User> {
  const response = await fetch(`${authBaseUrl}/user`, {
    headers: { Cookie: cookies().toString() },
    next: {
      revalidate: 5,
      tags: [USER_TAG],
    },
  })

  if (!response.ok) {
    return
  }

  const rawData = await response.json()

  const data = await UserSchema.parseAsync(rawData)

  return data
}

export async function getUserOrThrow() {
  const user = await getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
