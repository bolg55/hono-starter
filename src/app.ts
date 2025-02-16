import type { PinoLogger } from 'hono-pino'

import { OpenAPIHono } from '@hono/zod-openapi'

import notFound from './middlewares/not-found.js'
import onError from './middlewares/on-error.js'
import { logger } from './middlewares/pino-logger.js'
import serveEmojiFavicon from './middlewares/serve-emoji-favicon.js'

interface AppBindings {
  Variables: {
    logger: PinoLogger
  }
}

const app = new OpenAPIHono<AppBindings>()

app.use(serveEmojiFavicon('🔥'))
app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.info('Log message')
  throw new Error('This is an error')
})

app.notFound(notFound)
app.onError(onError)

export default app
