import { z } from 'zod'

function addImageBaseUrl(url?: string) {
  if (!url) {
    return
  }
  return `https://arkhamdb.com${url}`
}

export const ORTIENTATION_VERTICAL = 'vertical'
export const ORTIENTATION_HORIZONTAL = 'horizontal'

export type CardOrientation =
  | typeof ORTIENTATION_VERTICAL
  | typeof ORTIENTATION_HORIZONTAL

export const CARD_TYPES = [
  'investigator',
  'asset',
  'treachery',
  'event',
  'skill',
  'enemy',
  'scenario',
  'agenda',
  'act',
  'location',
  'story',
  'key',
] as const

export type CardType = (typeof CARD_TYPES)[number]

const HORIZONTAL_CARD_TYPES: CardType[] = ['investigator', 'agenda', 'act']

const CardSchema = z
  .object({
    name: z.string(),
    subname: z.string().optional(),
    text: z.string().optional(),
    code: z.string(),
    type_code: z.enum(CARD_TYPES),
    pack_code: z.string(),
    imagesrc: z.string().optional().transform(addImageBaseUrl),
    backimagesrc: z.string().optional().transform(addImageBaseUrl),
  })
  .transform((rawCard) => ({
    name: rawCard.name,
    subName: rawCard.subname,
    text: rawCard.text,
    code: rawCard.code,
    type: rawCard.type_code,
    packCode: rawCard.pack_code,
    orientation: (HORIZONTAL_CARD_TYPES.includes(rawCard.type_code)
      ? ORTIENTATION_HORIZONTAL
      : ORTIENTATION_VERTICAL) as CardOrientation,
    imageSrc: rawCard.imagesrc,
    backImageSrc: rawCard.backimagesrc,
  }))

export type Card = z.infer<typeof CardSchema>

const CardsSchema = z.array(CardSchema)

export type Cards = z.infer<typeof CardsSchema>

export const PACK_CARDS_BASE_TAG = 'pack-cards'

const API_PACK_CARDS_BASE_URL = 'https://arkhamdb.com/api/public/cards/'

export async function getPackCards(
  packCode: string,
  maximumCount: number = -1
): Promise<Cards> {
  const response = await fetch(`${API_PACK_CARDS_BASE_URL}${packCode}`, {
    next: { revalidate: 3600, tags: [`${PACK_CARDS_BASE_TAG}-${packCode}`] },
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
