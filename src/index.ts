import { serve } from '@hono/node-server'
import app from './app.js'
import env from './env.js'

const { PORT } = env
const port = PORT
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
