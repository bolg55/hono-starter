import type { AppRouteHandler } from '@/lib/types.js'

import * as HttpStatusCodes from '@/lib/http-status-codes.js'
import * as HttpStatusPhrases from '@/lib/http-status-phrases.js'

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute } from './tasks.routes.js'

import { createTask, getTaskById, getTasks, updateTask } from './tasks.services.js'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await getTasks()

  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')
  const insertedTask = await createTask(task)

  return c.json(insertedTask, HttpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const task = await getTaskById(id)

  if (!task) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(task, HttpStatusCodes.OK)
}

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')
  const task = await updateTask(id, updates)

  if (!task) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(task, HttpStatusCodes.OK)
}
