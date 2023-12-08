import { db } from '@/db/db'
import { RawPack, getRawPacks } from './raw-packs'
import { z } from 'zod'
import { getUser, getUserOrThrow } from '@/app/user/user'
import { revalidateTag, unstable_cache } from 'next/cache'

export type Pack = RawPack & {
  owned?: boolean
}

export type Packs = Pack[]

export async function getPacks(): Promise<Packs> {
  const [rawPacksQuery, userPacksInfoQuery] = await Promise.allSettled([
    getRawPacks(),
    getUserPacksInfo(),
  ])

  if (
    rawPacksQuery.status === 'rejected' ||
    userPacksInfoQuery.status === 'rejected'
  ) {
    return []
  }

  const userPacksInfo = userPacksInfoQuery.value

  return rawPacksQuery.value.map((rawPack) => ({
    ...rawPack,
    owned: userPacksInfo.some(({ packCode }) => packCode === rawPack.code),
  }))
}

type UserPackInfo = {
  packCode: string
}

async function getUserPacksInfo(): Promise<UserPackInfo[]> {
  const user = await getUser()

  if (!user) {
    return []
  }

  return cachedGetUserPacksInfoFromDb(user.username)
}

async function getUserPacksInfoFromDb(
  username: string
): Promise<UserPackInfo[]> {
  const result = await db()
    .selectFrom('userPacks')
    .select('packCode')
    .where('username', '=', username)
    .execute()

  return result
}

const GET_USER_PACKS_INFO_TAG = 'user-packs-info'

const cachedGetUserPacksInfoFromDb = unstable_cache(
  getUserPacksInfoFromDb,
  ['user-packs-info'],
  {
    tags: [GET_USER_PACKS_INFO_TAG],
  }
)

export const PackActionPropsSchema = z.object({
  code: z.string(),
})

export type PackActionProps = z.infer<typeof PackActionPropsSchema>

export async function addPack({ code }: PackActionProps) {
  const user = await getUserOrThrow()

  await db()
    .insertInto('userPacks')
    .values({
      username: user.username,
      packCode: code,
    })
    .executeTakeFirstOrThrow()

  revalidateTag(GET_USER_PACKS_INFO_TAG)
}

export async function removePack({ code }: PackActionProps) {
  const user = await getUserOrThrow()

  await db()
    .deleteFrom('userPacks')
    .where('username', '=', user.username)
    .where('packCode', '=', code)
    .executeTakeFirstOrThrow()

  revalidateTag(GET_USER_PACKS_INFO_TAG)
}
