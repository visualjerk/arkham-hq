import { Kysely } from 'kysely'
import { DataApiDialect } from 'kysely-data-api'
import { RDSData } from '@aws-sdk/client-rds-data'
import { RDS } from 'sst/node/rds'

interface Database {
  userPacks: {
    username: string
    packCode: string
  }
}

export const db = () =>
  new Kysely<Database>({
    dialect: new DataApiDialect({
      mode: 'postgres',
      driver: {
        database: RDS.ArkhamHqCollectingDb.defaultDatabaseName,
        secretArn: RDS.ArkhamHqCollectingDb.secretArn,
        resourceArn: RDS.ArkhamHqCollectingDb.clusterArn,
        client: new RDSData({}),
      },
    }),
  })
