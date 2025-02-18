import { defineConfig } from 'drizzle-kit'

import env from '@/env.js'

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = env

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema/*.schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
})
