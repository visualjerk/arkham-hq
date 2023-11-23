'use server'

import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider'
import { SignInDTO } from './sign-in-schema'
import { getClient } from '@/lib/cognito-client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_COOKIE_NAME } from '@/lib/constants'
import { revalidatePath } from 'next/cache'

export async function signIn(prevState: any, formData: FormData) {
  const parse = SignInDTO.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    redirectTo: formData.get('redirectTo'),
  })

  if (!parse.success) {
    return { message: 'Failed to signin' }
  }

  const data = parse.data

  try {
    const command = new InitiateAuthCommand({
      ClientId: process.env.AWS_AUTH_CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: data.username,
        PASSWORD: data.password,
      },
    })

    const response = await getClient().send(command)
    const token = response.AuthenticationResult?.AccessToken

    if (!token) {
      return { message: 'Failed to signin' }
    }

    cookies().set(AUTH_COOKIE_NAME, token, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: true,
    })
  } catch (e) {
    return { message: 'Failed to signin' }
  }

  revalidatePath('/')
  redirect(data.redirectTo)
}
