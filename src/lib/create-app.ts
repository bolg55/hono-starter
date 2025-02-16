import { OpenAPIHono } from '@hono/zod-openapi'

import notFound from '@/middlewares/not-found.js'
import onError from '@/middlewares/on-error.js'
import { logger } from '@/middlewares/pino-logger.js'
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon.js'

import type { AppBindings } from './types.js'

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  })

  app.use(serveEmojiFavicon('🔥'))
  app.use(logger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
