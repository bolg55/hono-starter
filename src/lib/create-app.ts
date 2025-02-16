import { OpenAPIHono } from '@hono/zod-openapi'

import notFound from '@/middlewares/not-found.js'
import onError from '@/middlewares/on-error.js'
import { logger } from '@/middlewares/pino-logger.js'
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon.js'
import defaultHook from '@/openapi/default-hook.js'

import type { AppBindings } from './types.js'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(serveEmojiFavicon('🔥'))
  app.use(logger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
