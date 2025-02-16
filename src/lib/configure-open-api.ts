import type { AppOpenApi } from './types.js'
import packageJSON from '../../package.json' assert { type: 'json' }

export default function configureOpenApi(app: AppOpenApi) {
  app.doc('/docs', {
    openapi: '3.0.0',
    info: {
      title: 'Hono API Starter',
      version: packageJSON.version,
      description: 'My API description',
    },

  })
}
