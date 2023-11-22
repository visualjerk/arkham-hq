import { z } from 'zod'

export const SignInDTO = z.object({
  username: z.string(),
  password: z.string(),
})
