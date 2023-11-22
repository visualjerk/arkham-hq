import { procedure } from '@/app/api/trpc/trpc'
import { SingupDTO } from '../schemas/signup'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider'

export const signUpApi = {
  signup: procedure.input(SingupDTO).mutation(({ input }) => {
    try {
      const client = new CognitoIdentityProviderClient({
        region: process.env.AWS_REGION,
      })

      const command = new SignUpCommand({
        ClientId: process.env.AWS_AUTH_CLIENT_ID,
        Username: input.username,
        Password: input.password,
        UserAttributes: [{ Name: 'email', Value: input.email }],
      })

      return client.send(command)
    } catch (e) {
      console.error(e)
    }
  }),
}
