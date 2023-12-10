import { imageIsInStore, storeImage } from './image-storage'
import { Cards } from '@/app/cards/card-schema'
import { getCards } from '@/app/cards/cards-api'

const IMAGE_BASE_URL = 'https://arkhamdb.com'

async function loadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)

  if (!response.ok) {
    const error = new Error(
      `error loading image ${url}: code ${response.status}`
    )
    console.error(error)
    throw error
  }

  return Buffer.from(await response.arrayBuffer())
}

async function syncImage(url: string) {
  if (await imageIsInStore(url)) {
    return
  }
  const imageBuffer = await loadImage(`${IMAGE_BASE_URL}${url}`)
  await storeImage(url, imageBuffer)
}

const BATCH_SIZE = 30

async function handleCardBatch(cards: Cards) {
  if (cards.length <= 0) {
    return
  }
  const nextBatch = cards.splice(0, BATCH_SIZE)
  const syncJobs = nextBatch.map(({ imageSrc }) =>
    imageSrc ? syncImage(imageSrc) : null
  )
  await Promise.allSettled(syncJobs)

  // Wait to prevent hitting quota limit
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await handleCardBatch(cards)
}

export async function handler() {
  const cards = await getCards()
  await handleCardBatch(cards)
}
