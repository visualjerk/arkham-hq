import { router } from './trpc'
import { signUpApi } from '@/app/sign-up/api/sign-up'

export const appRouter = router({
  ...signUpApi,
})

export type AppRouter = typeof appRouter
