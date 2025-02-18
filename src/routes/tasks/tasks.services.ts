import { eq } from 'drizzle-orm'

import type { InsertTask, PatchTask } from '@/db/schema/tasks.schema.js'

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

export async function getTaskById(id: number) {
  const task = await db.query.tasks.findFirst({
    where(fields, opperators) {
      return opperators.eq(fields.id, id)
    },
  })

  return task
}

export async function updateTask(id: number, updates: PatchTask) {
  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning()

  return task
}
