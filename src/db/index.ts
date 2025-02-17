import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import env from '@/env.js'

import * as schema from './schema.js'

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = env

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
})
const db = drizzle({ client, schema })

export default db
