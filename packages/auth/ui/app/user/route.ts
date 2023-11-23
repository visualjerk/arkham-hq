import { getClient } from '@/lib/cognito-client'
import { AUTH_HEADER_NAME } from '@/lib/constants'
import { GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import { headers } from 'next/headers'

export async function GET() {
  const token = headers().get(AUTH_HEADER_NAME)

  if (!token || typeof token !== 'string') {
    return new Response('unauthorized', {
      status: 401,
    })
  }

  const command = new GetUserCommand({
    AccessToken: token,
  })

  const response = await getClient().send(command)

  return new Response(
    JSON.stringify({
      username: response.Username,
    }),
    {
      status: 200,
    }
  )
}
