import { createRoute, z } from '@hono/zod-openapi'

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from '@/db/schema/tasks.schema.js'
import { notFoundSchema } from '@/lib/constants.js'
import * as HttpStatusCodes from '@/lib/http-status-codes.js'
import jsonContentOneOf from '@/openapi/helpers/json-content-one-of.js'
import jsonContentRequired from '@/openapi/helpers/json-content-required.js'
import jsonContent from '@/openapi/helpers/json-content.js'
import createErrorSchema from '@/openapi/schemas/create-error-schema.js'
import IdParamsSchema from '@/openapi/schemas/id-params.js'

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

export const getOne = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'get',
  request: { params: IdParamsSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The requested task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), 'Invalid id error'),
  },

})

export const patch = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'patch',
  request: { params: IdParamsSchema, body: jsonContentRequired(patchTasksSchema, 'The task updates') },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The updated task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf([createErrorSchema(patchTasksSchema), createErrorSchema(IdParamsSchema)], 'The validation error(s)'),
  },

})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
