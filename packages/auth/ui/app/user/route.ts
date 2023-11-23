import { getClient } from '@/lib/cognito-client'
import { AUTH_COOKIE_NAME } from '@/lib/constants'
import { GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)

  if (!token) {
    return new Response('unauthorized', {
      status: 401,
    })
  }

  const command = new GetUserCommand({
    AccessToken: token.value,
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
