import { PageHeading } from '@arkham-hq/shared-ui'
import PackList from './packs/pack-list'
import { Suspense } from 'react'
import PackListSkeleton from './packs/pack-list-skeleton'

export default async function Home() {
  return (
    <main className="pt-5 pb-20">
      <PageHeading className="mb-4">All Packs</PageHeading>
      <section>
        <Suspense fallback={<PackListSkeleton />}>
          <PackList />
        </Suspense>
      </section>
    </main>
  )
}
