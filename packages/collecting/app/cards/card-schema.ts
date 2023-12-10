import { z } from 'zod'

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

export const CardSchema = z
  .object({
    name: z.string(),
    subname: z.string().optional(),
    text: z.string().optional(),
    code: z.string(),
    type_code: z.enum(CARD_TYPES),
    pack_code: z.string(),
    imagesrc: z.string().optional(),
    backimagesrc: z.string().optional(),
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

export const CardsSchema = z.array(CardSchema)

export type Cards = z.infer<typeof CardsSchema>
