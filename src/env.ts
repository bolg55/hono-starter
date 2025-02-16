import type { ZodError } from 'zod'

import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

const EnvSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z.string().default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
})

export type Env = z.infer<typeof EnvSchema>

// eslint-disable-next-line import/no-mutable-exports
let env: Env

try {
// eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env)
}
catch (e) {
  const error = e as ZodError
  console.error('❌ Invalid environment variables:')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default env
