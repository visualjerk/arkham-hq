import PackItem from './pack-item'
import { Packs } from './packs'

export type PackListProps = {
  packs: Packs
}

export default function PackList({ packs }: PackListProps) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {packs.map((pack) => (
        <PackItem key={pack.code} pack={pack} />
      ))}
    </div>
  )
}
