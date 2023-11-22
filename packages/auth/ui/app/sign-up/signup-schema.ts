import { z } from 'zod'

export const SignupDTO = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})
