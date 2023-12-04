import { Stack, StackProps } from 'aws-cdk-lib'
import * as route from 'aws-cdk-lib/aws-route53'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as cm from 'aws-cdk-lib/aws-certificatemanager'
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import { Construct } from 'constructs'
import path = require('path')

type AuthStackProps = StackProps & {
  zoneDomain: string
  domain: string
  cookieDomain: string
}

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id, props)

    const publicHostedZone = route.HostedZone.fromLookup(
      this,
      'ArkhamHqAuthHostedZone',
      {
        domainName: props.zoneDomain,
      }
    )

    const certificate = new cm.Certificate(this, 'ArkhamHqAuthCertificate', {
      domainName: props.domain,
      certificateName: 'Arkham HQ Auth',
      validation: cm.CertificateValidation.fromDns(publicHostedZone),
    })

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

    const authClient = userPool.addClient('ArkhamHqAuthClient', {
      authFlows: {
        userPassword: true,
      },
    })

    // Create VPC and Fargate Cluster
    // NOTE: Limit AZs to avoid reaching resource quotas
    const vpc = new ec2.Vpc(this, 'ArkhamHqAuthVpc', { maxAzs: 1 })
    const cluster = new ecs.Cluster(this, 'ArkhamHqAuthCluster', { vpc })

    const dockerImage = new DockerImageAsset(this, 'ArkhamHqAuthUiImage', {
      // Needed to bring the workspace's "pnpm-lock.yaml" in scope
      directory: path.join(__dirname, '../../../../'),
      file: 'packages/auth/ui/docker/Dockerfile',
    })

    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'ArkhamHqAuthUi',
      {
        cluster,
        certificate,
        domainName: props.domain,
        domainZone: publicHostedZone,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(dockerImage),
          containerPort: 3000,
          environment: {
            AWS_REGION: this.region,
            AWS_AUTH_CLIENT_ID: authClient.userPoolClientId,
            COOKIE_DOMAIN: props.cookieDomain,
            NEXT_TELEMETRY_DISABLED: '1',
          },
        },
      }
    )
  }
}
