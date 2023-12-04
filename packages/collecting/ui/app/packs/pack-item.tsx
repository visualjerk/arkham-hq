import { LinkButton } from '@arkham-hq/shared-ui'
import { Pack } from './packs'

export type PackItemProps = {
  pack: Pack
}

export default function PackItem({ pack }: PackItemProps) {
  const { name, code } = pack

  return (
    <div className="py-3 px-5 bg-stone-50 rounded-md shadow-sm shadow-stone-400 flex flex-col gap-4">
      <div>
        <h3 className="font-serif font-medium text-2xl leading-none text-stone-700 mb-2">
          {name}
        </h3>
        <p className="text-xs uppercase text-stone-500">{code}</p>
      </div>
      <div className="mt-auto">
        <LinkButton>Show Cards</LinkButton>
      </div>
    </div>
  )
}
