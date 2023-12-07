import { db } from '@/db/db'
import { RawPack, getRawPacks } from './raw-packs'
import { z } from 'zod'
import { getUser } from '@/app/user/user'
import { revalidateTag, unstable_cache } from 'next/cache'

export type Pack = RawPack

export type PackDetails = Pack & {
  owned?: boolean
}

export type Packs = Pack[]

export async function getPacks(): Promise<Packs> {
  return getRawPacks()
}

export function getPackDetailsTag(packCode: string) {
  return `pack-details-${packCode}`
}

export async function getPackDetails(pack: Pack): Promise<PackDetails> {
  const user = await getUser()

  if (!user) {
    return pack
  }

  const cachedDoesUserOwnPack = unstable_cache(
    (username: string, packCode: string) => doesUserOwnPack(username, packCode),
    ['pack-details', user.username, pack.code],
    {
      tags: [getPackDetailsTag(pack.code)],
    }
  )

  const owned = await cachedDoesUserOwnPack(user.username, pack.code)

  return {
    ...pack,
    owned,
  }
}

async function doesUserOwnPack(
  username: string,
  packCode: string
): Promise<boolean> {
  const result = await db()
    .selectFrom('userPacks')
    .select('packCode')
    .where('username', '=', username)
    .where('packCode', '=', packCode)
    .executeTakeFirst()

  return result !== undefined
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

  await db()
    .insertInto('userPacks')
    .values({
      username: user.username,
      packCode: code,
    })
    .executeTakeFirstOrThrow()

  revalidateTag(getPackDetailsTag(code))
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

  revalidateTag(getPackDetailsTag(code))
}
