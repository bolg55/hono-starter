import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
