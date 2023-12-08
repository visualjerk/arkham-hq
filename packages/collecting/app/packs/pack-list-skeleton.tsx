import PackItemSkeleton from './pack-item-skeleton'

export default function PackListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <PackItemSkeleton />
      <PackItemSkeleton />
      <PackItemSkeleton />
    </div>
  )
}
