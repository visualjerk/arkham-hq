import { Stack, StackProps } from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const userPool = new cognito.UserPool(this, 'ArkhamHqAuthUserPool', {
      signInCaseSensitive: false,
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email for Arkham HQ!',
        emailBody:
          'Thanks for signing up to Arkham HQ! Yer verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage:
          'Thanks for signing up to Arkham HQ! Yer verification code is {####}',
      },
      signInAliases: {
        username: true,
        email: true,
      },
    })

    userPool.addClient('ArkhamHqAuthClient', {
      authFlows: {
        userPassword: true,
      },
    })
  }
}
