import { procedure } from '@/app/api/trpc/trpc'
import { ConfirmSignUpDTO } from './confirm-sign-up-schema'
import { ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { getClient } from '@/lib/cognito-client'

export const confirmSignUpApi = {
  confirmSignUp: procedure.input(ConfirmSignUpDTO).mutation(({ input }) => {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: process.env.AWS_AUTH_CLIENT_ID,
        Username: input.username,
        ConfirmationCode: input.code,
      })

      return getClient().send(command)
    } catch (e) {
      console.error(e)
    }
  }),
}
