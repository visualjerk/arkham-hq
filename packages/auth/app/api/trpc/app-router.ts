import { router } from './trpc'
import { signUpApi } from '@/app/sign-up/sign-up-api'
import { confirmSignUpApi } from '@/app/confirm-sign-up/confirm-sign-up-api'

export const appRouter = router({
  ...signUpApi,
  ...confirmSignUpApi,
})

export type AppRouter = typeof appRouter
