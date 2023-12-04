import { Stack, StackProps } from 'aws-cdk-lib'
import * as route from 'aws-cdk-lib/aws-route53'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as rds from 'aws-cdk-lib/aws-rds'
import * as cm from 'aws-cdk-lib/aws-certificatemanager'
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import { Construct } from 'constructs'
import path = require('path')

type CollectingStackProps = StackProps & {
  zoneDomain: string
  domain: string
  baseUrl: string
  authServiceUrl: string
}

export class CollectingStack extends Stack {
  constructor(scope: Construct, id: string, props: CollectingStackProps) {
    super(scope, id, props)

    const publicHostedZone = route.HostedZone.fromLookup(
      this,
      'ArkhamHqCollectingHostedZone',
      {
        domainName: props.zoneDomain,
      }
    )

    const certificate = new cm.Certificate(
      this,
      'ArkhamHqCollectingCertificate',
      {
        domainName: props.domain,
        certificateName: 'Arkham HQ Collecting',
        validation: cm.CertificateValidation.fromDns(publicHostedZone),
      }
    )

    // Create VPC and Fargate Cluster
    // NOTE: Limit AZs to avoid reaching resource quotas
    const vpc = new ec2.Vpc(this, 'ArkhamHqCollectingVpc', { maxAzs: 1 })
    const cluster = new ecs.Cluster(this, 'ArkhamHqCollectingCluster', { vpc })

    const db = new rds.DatabaseCluster(this, 'ArkhamHqCollectingDatabase', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_4,
      }),
      vpc,
      writer: rds.ClusterInstance.provisioned('writer', {
        publiclyAccessible: false,
      }),
    })
    const dbHost = db.clusterEndpoint.hostname
    const dbPort = db.clusterEndpoint.port
    const dbUsername = db.secret!.secretValueFromJson('username').toString()
    const dbPassword = db.secret!.secretValueFromJson('password').toString()

    // DB connection string (e.g. "postgresql://postgres:password@0.0.0.0:5432/arkham-collecting")
    const databaseUrl = `${db.engine?.engineType}://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/arkham-collecting`

    const dockerImage = new DockerImageAsset(
      this,
      'ArkhamHqCollectingUiImage',
      {
        // Needed to bring the workspace's "pnpm-lock.yaml" in scope
        directory: path.join(__dirname, '../../../../'),
        file: 'packages/collecting/ui/docker/Dockerfile',
      }
    )

    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'ArkhamHqCollectingUi',
      {
        cluster,
        certificate,
        domainName: props.domain,
        domainZone: publicHostedZone,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(dockerImage),
          containerPort: 3000,
          environment: {
            AUTH_SERVICE_URL: props.authServiceUrl,
            BASE_URL: props.baseUrl,
            NEXT_TELEMETRY_DISABLED: '1',
            DATABASE_URL: databaseUrl,
          },
        },
      }
    )
  }
}
