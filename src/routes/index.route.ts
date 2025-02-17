import { createRoute, z } from '@hono/zod-openapi'

import { createRouter } from '@/lib/create-app.js'
import * as HttpStatusCodes from '@/lib/http-status-codes.js'
import jsonContent from '@/openapi/helpers/json-content.js'

const router = createRouter().openapi(createRoute({
  method: 'get',
  path: '/',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Hono Starter API Index',
    ),
  },
}), (c) => {
  return c.json({ message: 'Hello World!' }, HttpStatusCodes.OK)
})

export default router
