import { z } from 'zod'

export const SingupDTO = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})
