import { router } from './trpc'
import { signInApi } from '@/app/sign-in/sign-in-api'
import { signUpApi } from '@/app/sign-up/sign-up-api'
import { confirmSignUpApi } from '@/app/confirm-sign-up/confirm-sign-up-api'

export const appRouter = router({
  ...signInApi,
  ...signUpApi,
  ...confirmSignUpApi,
})

export type AppRouter = typeof appRouter
