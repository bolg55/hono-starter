import { apiReference } from '@scalar/hono-api-reference'

import type { AppOpenApi } from './types.js'

import packageJSON from '../../package.json' assert { type: 'json' }

export default function configureOpenApi(app: AppOpenApi) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Hono API Starter Project',
      version: packageJSON.version,
      description: 'A starter project for building APIs with Hono',
    },

  })

  app.get(
    '/api-docs',
    apiReference({
      operationsSorter: 'alpha',
      theme: 'kepler',
      hideDownloadButton: true,
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
      spec: {
        url: '/doc',
      },
    }),
  )
}
