import db from '@/db/index.js'

export async function getTasks() {
  const tasks = await db.query.tasks.findMany()

  return tasks
}
