import { createRoute, z } from '@hono/zod-openapi'

import { insertTasksSchema, selectTasksSchema } from '@/db/schema/tasks.schema.js'
import * as HttpStatusCodes from '@/lib/http-status-codes.js'
import jsonContentRequired from '@/openapi/helpers/json-content-required.js'
import jsonContent from '@/openapi/helpers/json-content.js'
import createErrorSchema from '@/openapi/schemas/create-error-schema.js'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), 'List of tasks'),

  },

})

export const create = createRoute({
  tags,
  path: '/tasks',
  method: 'post',
  request: { body: jsonContentRequired(insertTasksSchema, 'The task to create') },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The created task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertTasksSchema), 'The validation error(s)'),
  },

})

export type ListRoute = typeof list
export type CreateRoute = typeof create
