import type { InsertTask } from '@/db/schema/tasks.schema.js'

import db from '@/db/index.js'
import { tasks } from '@/db/schema/tasks.schema.js'

export async function getTasks() {
  const tasks = await db.query.tasks.findMany()

  return tasks
}

export async function createTask(task: InsertTask) {
  const [inserted] = await db.insert(tasks).values(task).returning()

  return inserted
}
