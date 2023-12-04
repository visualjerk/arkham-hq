import { Packs } from './packs'

export type PackListProps = {
  packs: Packs
}

export default function PackList({ packs }: PackListProps) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {packs.map(({ code, name }) => (
        <div key={code} className="p-3 bg-stone-50 shadow-sm shadow-stone-300">
          <h3 className="font-serif font-medium text-2xl text-stone-900">
            {name}
          </h3>
        </div>
      ))}
    </div>
  )
}
