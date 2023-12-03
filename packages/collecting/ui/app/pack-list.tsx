import { Packs } from './packs'

export type PackListProps = {
  packs: Packs
}

export default function PackList({ packs }: PackListProps) {
  return (
    <section>
      <h2 className="mb-4">All Packs</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {packs.map(({ code, name }) => (
          <div key={code} className="p-3 bg-white">
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
