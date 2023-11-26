import { Stack, StackProps } from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import { Construct } from 'constructs'
import path = require('path')

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

    const authClient = userPool.addClient('ArkhamHqAuthClient', {
      authFlows: {
        userPassword: true,
      },
    })

    // Create VPC and Fargate Cluster
    // NOTE: Limit AZs to avoid reaching resource quotas
    const vpc = new ec2.Vpc(this, 'ArkhamHqAuthVpc', { maxAzs: 2 })
    const cluster = new ecs.Cluster(this, 'ArkhamHqAuthCluster', { vpc })

    const dockerImage = new DockerImageAsset(this, 'ArkhamHqAuthUiImage', {
      // Needed to bring the workspace's "pnpm-lock.yaml" in scope
      directory: path.join(__dirname, '../../../../'),
      file: 'packages/auth/ui/docker/Dockerfile',
    })

    // Instantiate Fargate Service with a cluster and a local image that gets
    // uploaded to an S3 staging bucket prior to being uploaded to ECR.
    // A new repository is created in ECR and the Fargate service is created
    // with the image from ECR.
    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'ArkhamHqAuthUi',
      {
        cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(dockerImage),
          containerPort: 3000,
          environment: {
            AWS_REGION: this.region,
            AWS_AUTH_CLIENT_ID: authClient.userPoolClientId,
            NEXT_TELEMETRY_DISABLED: '1',
          },
        },
      }
    )
  }
}
