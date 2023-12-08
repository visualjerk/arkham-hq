import PackItem from './pack-item'
import { getPacks } from './packs'

export default async function PackList() {
  const packs = await getPacks()

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {packs.map((pack) => (
        <PackItem key={pack.code} pack={pack} />
      ))}
    </div>
  )
}
