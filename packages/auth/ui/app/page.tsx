import { LinkButton, PageHeading } from '@arkham-hq/shared-ui'

export default function Home() {
  return (
    <main className="grid gap-5 max-w-md p-10">
      <PageHeading>Welcome to Arkham HQ</PageHeading>
      <p className="text-stone-500">Do you already have an account?</p>
      <LinkButton href="/sign-in">Sign In</LinkButton>
      <p className="text-stone-500">Do you like to create a new account?</p>
      <LinkButton href="/sign-up">Sign Up</LinkButton>
    </main>
  )
}
