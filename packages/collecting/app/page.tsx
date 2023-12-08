import { PageHeading } from '@arkham-hq/shared-ui'
import PackList from './packs/pack-list'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="pt-5 pb-20">
      <PageHeading className="mb-4">All Packs</PageHeading>
      <section>
        <Suspense fallback={<div>Loading packs ...</div>}>
          <PackList />
        </Suspense>
      </section>
    </main>
  )
}
