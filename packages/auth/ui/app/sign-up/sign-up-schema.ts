import { z } from 'zod'

export const SignUpDTO = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})
