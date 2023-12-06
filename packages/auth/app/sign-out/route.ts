import { RevokeTokenCommand } from '@aws-sdk/client-cognito-identity-provider'
import { getClient } from '@/lib/cognito-client'
import { redirect } from 'next/navigation'
import {
  AUTH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/lib/constants'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

async function revokeToken(refreshToken: string) {
  const command = new RevokeTokenCommand({
    ClientId: process.env.AWS_AUTH_CLIENT_ID,
    Token: refreshToken,
  })

  await getClient().send(command)
}

export async function GET(request: NextRequest) {
  const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE_NAME)

  if (!refreshToken) {
    return new Response('unauthorized', {
      status: 401,
    })
  }

  try {
    await revokeToken(refreshToken.value)
    cookies().delete({
      name: AUTH_TOKEN_COOKIE_NAME,
      domain: process.env.COOKIE_DOMAIN,
    })
    cookies().delete({
      name: REFRESH_TOKEN_COOKIE_NAME,
      domain: process.env.COOKIE_DOMAIN,
    })
  } catch (e) {
    return new Response('Failed to sign out', {
      status: 500,
    })
  }

  const redirectTo = request.nextUrl.searchParams.get('redirectTo')
  redirect(redirectTo ?? '/')
}
