import { createRoute } from '@hono/zod-openapi'

import { createRouter } from '@/lib/create-app.js'
import * as HttpStatusCodes from '@/lib/http-status-codes.js'
import jsonContent from '@/openapi/helpers/json-content.js'
import createMessageObjectSchema from '@/openapi/schemas/create-message-object.js'

const router = createRouter().openapi(createRoute({
  tags: ['Index'],
  method: 'get',
  path: '/',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema('Hello World!'),
      'Api root response',
    ),
  },
}), (c) => {
  return c.json({ message: 'Hello World!' }, HttpStatusCodes.OK)
})

export default router
