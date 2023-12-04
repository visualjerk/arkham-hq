import { Button } from '@arkham-hq/shared-ui'
import { Pack, PackActionPropsSchema, addPack, removePack } from './packs'
import { revalidatePath } from 'next/cache'

export type PackItemOwnButtonProps = {
  pack: Pack
}

export default async function PackItemOwnButton({
  pack,
}: PackItemOwnButtonProps) {
  const { code, owned } = pack

  async function handleFormAction(formData: FormData) {
    'use server'

    const parse = PackActionPropsSchema.safeParse({
      code: formData.get('code'),
    })

    if (!parse.success) {
      return
    }

    const query = owned ? removePack(parse.data) : addPack(parse.data)
    await query
    revalidatePath('/')
  }

  return (
    <form action={handleFormAction}>
      <Button type="submit">{owned ? 'Remove' : 'Add'}</Button>
      <input type="hidden" name="code" value={code} />
    </form>
  )
}
