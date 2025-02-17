import { apiReference } from '@scalar/hono-api-reference'

import type { AppOpenApi } from './types.js'

import packageJSON from '../../package.json' assert { type: 'json' }

export default function configureOpenApi(app: AppOpenApi) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Hono API Starter',
      version: packageJSON.version,
      description: 'My API description',
    },

  })

  app.get(
    '/api-docs',
    apiReference({
      pageTitle: 'Hono API Reference',
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
