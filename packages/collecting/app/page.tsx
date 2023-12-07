import { PageHeading } from '@arkham-hq/shared-ui'
import { getPacks } from './packs/packs'
import PackList from './packs/pack-list'
import { Suspense } from 'react'

export default async function Home() {
  const packs = await getPacks()

  return (
    <main className="pt-5 pb-20">
      <PageHeading className="mb-4">All Packs</PageHeading>
      <section>
        <Suspense fallback={<div>Loading packs ...</div>}>
          <PackList packs={packs} />
        </Suspense>
      </section>
    </main>
  )
}
