import { SSTConfig } from 'sst'
import { NextjsSite, Cognito } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'ArkhamHqAuth',
      region: 'eu-central-1',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const auth = new Cognito(stack, 'ArkhamHqAuthUserPool', {
        login: ['email', 'username', 'preferredUsername'],
        cdk: {
          userPoolClient: {
            authFlows: {
              userPassword: true,
            },
          },
        },
      })

      const authClient = auth.cdk.userPoolClient

      const site = new NextjsSite(stack, 'ArkhamHqAuthUi', {
        customDomain: {
          domainName: 'auth.arkhamhq.aws.visualjerk.de',
          hostedZone: 'aws.visualjerk.de',
        },
        environment: {
          AWS_AUTH_CLIENT_ID: authClient.userPoolClientId,
          BASE_URL: 'https://auth.arkhamhq.aws.visualjerk.de',
          COOKIE_DOMAIN: 'arkhamhq.aws.visualjerk.de',
          NEXT_TELEMETRY_DISABLED: '1',
        },
      })

      stack.addOutputs({
        Url: site.customDomainUrl,
      })
    })
  },
} satisfies SSTConfig
