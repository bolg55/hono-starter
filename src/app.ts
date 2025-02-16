import createApp from '@/lib/create-app.js'

const app = createApp()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.info('Log message')
  throw new Error('This is an error')
})

export default app
