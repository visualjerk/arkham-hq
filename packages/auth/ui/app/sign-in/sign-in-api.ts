import { procedure } from '@/app/api/trpc/trpc'
import { SignInDTO } from './sign-in-schema'
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider'
import { getClient } from '@/lib/cognito-client'
import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/lib/constants'

export const signInApi = {
  signIn: procedure.input(SignInDTO).mutation(async ({ input }) => {
    try {
      const command = new InitiateAuthCommand({
        ClientId: process.env.AWS_AUTH_CLIENT_ID,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: input.username,
          PASSWORD: input.password,
        },
      })

      const response = await getClient().send(command)
      const token = response.AuthenticationResult?.AccessToken

      if (!token) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Missing AccessToken',
        })
      }

      cookies().set(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: true,
      })
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: e,
      })
    }
  }),
}
