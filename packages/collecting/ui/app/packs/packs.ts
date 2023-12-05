import { db } from '@/db/db'
import { RawPack, getRawPacks } from './raw-packs'
import { z } from 'zod'
import { getUser } from '@/app/user/user'

export type Pack = RawPack & {
  owned?: boolean
}

export type Packs = Pack[]

export async function getPacks(username: string): Promise<Packs> {
  const rawPacksQuery = getRawPacks()
  const userPacksQuery = getUserPacks(username)

  const [packs, userPacks] = await Promise.allSettled([
    rawPacksQuery,
    userPacksQuery,
  ])

  if (packs.status !== 'fulfilled' || userPacks.status !== 'fulfilled') {
    throw new Error('Error fetching collection packs')
  }

  return packs.value.map((pack) => ({
    ...pack,
    owned: userPacks.value.some(({ packCode }) => packCode === pack.code),
  }))
}

async function getUserPacks(username: string) {
  return db()
    .selectFrom('userPacks')
    .selectAll()
    .where('username', '=', username)
    .execute()
}

export const PackActionPropsSchema = z.object({
  code: z.string(),
})

export type PackActionProps = z.infer<typeof PackActionPropsSchema>

export async function addPack({ code }: PackActionProps) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return db()
    .insertInto('userPacks')
    .values({
      username: user.username,
      packCode: code,
    })
    .executeTakeFirstOrThrow()
}

export async function removePack({ code }: PackActionProps) {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  await db()
    .deleteFrom('userPacks')
    .where('username', '=', user.username)
    .where('packCode', '=', code)
    .executeTakeFirstOrThrow()
}
