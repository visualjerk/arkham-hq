import { SSTConfig } from 'sst'
import { NextjsSite, RDS } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'ArkhamHqCollecting',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const db = new RDS(stack, 'ArkhamHqCollectingDb', {
        engine: 'postgresql13.9',
        defaultDatabaseName: 'arkhamcollecting',
        migrations: 'db/migrations',
      })

      const site = new NextjsSite(stack, 'ArkhamHqCollectingUi', {
        customDomain: {
          domainName: 'collecting.arkhamhq.aws.visualjerk.de',
          hostedZone: 'aws.visualjerk.de',
        },
        bind: [db],
        environment: {
          AUTH_SERVICE_URL: 'https://auth.arkhamhq.aws.visualjerk.de',
          BASE_URL: 'https://collecting.arkhamhq.aws.visualjerk.de',
          NEXT_TELEMETRY_DISABLED: '1',
        },
      })

      stack.addOutputs({
        Url: site.customDomainUrl,
        EnvironmentUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
