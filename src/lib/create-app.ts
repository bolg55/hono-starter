import type { PinoLogger } from 'hono-pino'

import { OpenAPIHono } from '@hono/zod-openapi'

import notFound from '@/middlewares/not-found.js'
import onError from '@/middlewares/on-error.js'
import { logger } from '@/middlewares/pino-logger.js'
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon.js'

interface AppBindings {
  Variables: {
    logger: PinoLogger
  }
}

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>()

  app.use(serveEmojiFavicon('🔥'))
  app.use(logger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
