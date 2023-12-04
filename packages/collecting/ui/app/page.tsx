import { PageHeading } from '@arkham-hq/shared-ui'
import { getRawPacks } from './packs/raw-packs'
import { getPacks } from './packs/packs'
import PackList from './packs/pack-list'
import { getUser } from './user/user'

export default async function Home() {
  const user = await getUser()

  const packs = user?.username
    ? await getPacks(user.username)
    : await getRawPacks()

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
