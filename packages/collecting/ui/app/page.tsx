import { PageHeading } from '@arkham-hq/shared-ui'
import { getPacks } from './packs'
import PackList from './pack-list'

export default async function Home() {
  const packs = await getPacks()

  return (
    <main className="grid gap-10 py-5">
      <PageHeading>Arkham HQ Collecting</PageHeading>
      <section>
        <h2 className="mb-4">All Packs</h2>
        <PackList packs={packs} />
      </section>
    </main>
  )
}
