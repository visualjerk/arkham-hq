import { z } from 'zod'

export const ConfirmSignUpDTO = z.object({
  username: z.string(),
  code: z.string(),
})
