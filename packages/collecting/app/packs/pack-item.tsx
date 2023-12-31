import { classNames } from '@arkham-hq/shared-ui'
import { Pack } from './packs'
import PackItemOwnButton from './pack-item-own-button'
import PackCards from './pack-cards'
import { Suspense } from 'react'

export type PackItemProps = {
  pack: Pack
}

export default function PackItem({ pack }: PackItemProps) {
  const { owned, name, code } = pack

  return (
    <div
      className={classNames(
        'py-3 px-5  rounded-md shadow-sm shadow-stone-400 flex flex-col gap-4 border-2',
        owned
          ? ' bg-indigo-50 border-indigo-600'
          : 'bg-stone-50 border-transparent'
      )}
    >
      <div>
        <h3 className="font-serif font-medium text-xl leading-none text-stone-700 mb-2">
          {name}
        </h3>
        <p className="text-xs uppercase text-stone-500">{code}</p>
      </div>
      <div>
        <Suspense fallback={<div>Loading cards ...</div>}>
          <PackCards pack={pack} />
        </Suspense>
      </div>
      <div className="mt-auto flex gap-2">
        <PackItemOwnButton pack={pack} />
      </div>
    </div>
  )
}
