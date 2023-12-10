import { Cards, CardsSchema } from './card-schema'

export const PACK_CARDS_BASE_TAG = 'pack-cards'

const API_CARDS_BASE_URL = 'https://arkhamdb.com/api/public/cards/'

export async function getPackCards(
  packCode: string,
  maximumCount: number = -1
): Promise<Cards> {
  const response = await fetch(`${API_CARDS_BASE_URL}${packCode}`, {
    next: { revalidate: 3600, tags: [`${API_CARDS_BASE_URL}-${packCode}`] },
  })

  if (!response.ok) {
    const error = new Error(`error loading cards: code ${response.status}`)
    console.error(error)
    throw error
  }

  const rawData = await response.json()

  const data = await CardsSchema.parseAsync(rawData.slice(0, maximumCount))

  return data
}

export async function getCards(): Promise<Cards> {
  const response = await fetch(API_CARDS_BASE_URL)

  if (!response.ok) {
    const error = new Error(`error loading cards: code ${response.status}`)
    console.error(error)
    throw error
  }

  const rawData = await response.json()

  const data = await CardsSchema.parseAsync(rawData)

  return data
}
