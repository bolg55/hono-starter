import type { NotFoundHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { NOT_FOUND } from '@/lib/http-status-codes.js'
import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@/lib/http-status-phrases.js'

const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    },
    { status: NOT_FOUND as ContentfulStatusCode },
  )
}

export default notFound
