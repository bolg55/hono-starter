import { createRoute, z } from '@hono/zod-openapi'

import { selectTasksSchema } from '@/db/schema/tasks.schema.js'
import * as HttpStatusCodes from '@/lib/http-status-codes.js'
import jsonContent from '@/openapi/helpers/json-content.js'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), 'List of tasks'),

  },

})

export type ListRoute = typeof list
