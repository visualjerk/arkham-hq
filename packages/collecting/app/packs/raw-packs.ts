import { z } from 'zod'

const API_PACKS_URL = 'https://arkhamdb.com/api/public/packs/'

const RawPackSchema = z.object({
  name: z.string(),
  code: z.string(),
})

export type RawPack = z.infer<typeof RawPackSchema>

const RawPacksSchema = z.array(RawPackSchema)

export type RawPacks = z.infer<typeof RawPacksSchema>

export const RAW_PACKS_TAG = 'raw-packs'

export async function getRawPacks(): Promise<RawPacks> {
  const response = await fetch(API_PACKS_URL, {
    next: { revalidate: 3600, tags: [RAW_PACKS_TAG] },
  })

  if (!response.ok) {
    const error = new Error(`error loading packs: code ${response.status}`)
    console.error(error)
    throw error
  }

  const rawData = await response.json()

  const data = await RawPacksSchema.parseAsync(rawData)

  return data
}
