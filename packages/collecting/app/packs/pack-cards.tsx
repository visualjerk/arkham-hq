import { Pack } from './packs'
import { getPackCards } from '../cards/cards'
import CardItem from '../cards/card-item'

export type PackCardsProps = {
  pack: Pack
}

const colStarts = ['col-start-1', 'col-start-3', 'col-start-5']

export default async function PackCards({ pack }: PackCardsProps) {
  const cards = await getPackCards(pack.code, 10)
  const teaserCards = cards
    .filter((card) => card.orientation === 'vertical')
    .slice(0, 3)

  return (
    <div className="grid grid-cols-9">
      {teaserCards.map((card, index) => (
        <CardItem
          key={card.code}
          card={card}
          className={`${colStarts[index]} col-span-3 row-start-1`}
        />
      ))}
    </div>
  )
}
