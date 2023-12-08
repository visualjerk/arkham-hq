import Image from 'next/image'
import { Card } from './cards'
import { HTMLAttributes } from 'react'

export type CardItemProps = HTMLAttributes<HTMLDivElement> & {
  card: Card
}

export default async function CardItem({ card, ...props }: CardItemProps) {
  return (
    <div {...props}>
      {card.imageSrc ? (
        <Image
          src={card.imageSrc}
          alt={card.name}
          width={100}
          height={140}
          className="rounded-sm shadow-md shadow-stone-400"
        />
      ) : (
        <div className="max-w-[100px] aspect-card bg-stone-100 border-2 border-stone-500 p-1 rounded-sm shadow-md shadow-stone-400 grid text-center">
          <div className="text-stone-600 text-xs font-serif font-bold">
            {card.name}
          </div>
          <div className="text-stone-400 text-xs">No Image</div>
        </div>
      )}
    </div>
  )
}
