#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { AuthStack } from '../lib/auth-stack'

const app = new cdk.App()
new AuthStack(app, 'ArkhamHqAuthStack', {
  zoneDomain: process.env.ZONE_DOMAIN ?? 'aws.visualjerk.de',
  domain: process.env.DOMAIN ?? 'auth.arkhamhq.aws.visualjerk.de',
  cookieDomain: process.env.COOKIE_DOMAIN ?? 'arkhamhq.aws.visualjerk.de',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
