import { procedure } from '@/app/api/trpc/trpc'
import { SignUpDTO } from './sign-up-schema'
import { SignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { getClient } from '@/lib/cognito-client'

export const signUpApi = {
  signup: procedure.input(SignUpDTO).mutation(({ input }) => {
    try {
      const command = new SignUpCommand({
        ClientId: process.env.AWS_AUTH_CLIENT_ID,
        Username: input.username,
        Password: input.password,
        UserAttributes: [{ Name: 'email', Value: input.email }],
      })

      return getClient().send(command)
    } catch (e) {
      console.error(e)
    }
  }),
}
