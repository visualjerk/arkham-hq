#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { CollectingStack } from '../lib/collecting-stack'

const app = new cdk.App()
new CollectingStack(app, 'ArkhamHqCollectingStack', {
  zoneDomain: process.env.ZONE_DOMAIN ?? 'aws.visualjerk.de',
  domain: process.env.DOMAIN ?? 'collecting.arkhamhq.aws.visualjerk.de',
  baseUrl:
    process.env.AUTH_SERVICE_URL ??
    'https://collecting.arkhamhq.aws.visualjerk.de',
  authServiceUrl:
    process.env.AUTH_SERVICE_URL ?? 'https://auth.arkhamhq.aws.visualjerk.de',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
