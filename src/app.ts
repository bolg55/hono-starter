import { OpenAPIHono } from '@hono/zod-openapi'
import notFound from './middlewares/not-found.js'
import onError from './middlewares/on-error.js'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.notFound(notFound)
app.onError(onError)

export default app
