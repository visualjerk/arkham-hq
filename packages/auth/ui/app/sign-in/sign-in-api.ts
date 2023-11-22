import { procedure } from '@/app/api/trpc/trpc'
import { SignInDTO } from './sign-in-schema'
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider'
import { getClient } from '@/lib/cognito-client'
import { TRPCError } from '@trpc/server'

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

      return response
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: e,
      })
    }
  }),
}
