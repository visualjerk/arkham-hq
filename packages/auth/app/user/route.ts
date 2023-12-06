import { getClient } from '@/lib/cognito-client'
import { AUTH_TOKEN_COOKIE_NAME } from '@/lib/constants'
import { GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get(AUTH_TOKEN_COOKIE_NAME)

  if (!token) {
    return new Response('unauthorized', {
      status: 401,
    })
  }

  const command = new GetUserCommand({
    AccessToken: token.value,
  })

  try {
    const response = await getClient().send(command)

    return new Response(
      JSON.stringify({
        username: response.Username,
      }),
      {
        status: 200,
      }
    )
  } catch (e) {
    return new Response('unauthorized', {
      status: 401,
    })
  }
}
