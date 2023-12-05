import { Kysely } from 'kysely'

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('userPacks')
    .addColumn('username', 'text')
    .addColumn('packCode', 'text')
    .addPrimaryKeyConstraint('usernamePackCode', ['username', 'packCode'])
    .execute()

  await db.schema
    .createIndex('username_index')
    .on('userPacks')
    .column('username')
    .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable('userPacks').execute()
}
