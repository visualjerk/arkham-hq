import { z } from 'zod'

const API_PACKS_URL = 'https://arkhamdb.com/api/public/packs/'

export const PackSchema = z.object({
  name: z.string(),
  code: z.string(),
})

export const PacksSchema = z.array(PackSchema)

export type Packs = z.infer<typeof PacksSchema>

export async function getPacks() {
  const response = await fetch(API_PACKS_URL)

  if (!response.ok) {
    throw new Error(`error loading packs: code ${response.status}`)
  }

  const rawData = await response.json()

  const data = await PacksSchema.parseAsync(rawData)

  return data
}
