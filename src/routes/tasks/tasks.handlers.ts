import type { AppRouteHandler } from '@/lib/types.js'

import type { CreateRoute, ListRoute } from './tasks.routes.js'

import { createTask, getTasks } from './tasks.services.js'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await getTasks()

  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')
  const insertedTask = await createTask(task)

  return c.json(insertedTask)
}
