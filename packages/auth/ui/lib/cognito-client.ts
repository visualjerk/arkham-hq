import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'

export function getClient() {
  return new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
  })
}
