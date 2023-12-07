import { SSTConfig } from 'sst'
import { NextjsSite, RDS } from 'sst/constructs'

export default {
  config(_) {
    return {
      name: 'ArkhamHqCollecting',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack, app }) {
      const hostedZone = 'aws.visualjerk.de'

      // Enable domains for local dev mode
      const domainPrefix = app.stage === 'prod' ? '' : 'dev-'
      const urlSuffix = app.stage === 'prod' ? '' : ':3000'

      const domainName = `${domainPrefix}collecting.arkhamhq.${hostedZone}`
      const baseUrl = `https://${domainName}${urlSuffix}`
      const authServiceUrl = `https://auth.arkhamhq.${hostedZone}`

      const db = new RDS(stack, 'ArkhamHqCollectingDb', {
        engine: 'postgresql13.9',
        defaultDatabaseName: 'arkhamcollecting',
        migrations: 'db/migrations',
        scaling: {
          minCapacity: 'ACU_2',
          maxCapacity: 'ACU_4',
          autoPause: true,
        },
      })

      const site = new NextjsSite(stack, 'ArkhamHqCollectingUi', {
        dev: {
          url: baseUrl,
        },
        customDomain: {
          domainName,
          hostedZone,
        },
        bind: [db],
        environment: {
          AUTH_SERVICE_URL: authServiceUrl,
          BASE_URL: baseUrl,
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
