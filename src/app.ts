import createApp from '@/lib/create-app.js'
import configureOpenApi from './lib/configure-open-api.js'

const app = createApp()

configureOpenApi(app)

export default app
