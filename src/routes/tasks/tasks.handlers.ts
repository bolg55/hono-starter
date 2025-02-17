import type { AppRouteHandler } from '@/lib/types.js'

import type { ListRoute } from './tasks.routes.js'

import { getTasks } from './tasks.services.js'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await getTasks()

  return c.json(tasks)
}
