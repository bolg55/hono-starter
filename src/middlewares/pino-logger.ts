import { pinoLogger } from 'hono-pino'

import env from '@/env.js'

const { NODE_ENV, LOG_LEVEL } = env

export function logger() {
  return pinoLogger({
    pino: {
      level: LOG_LEVEL || 'info',
      transport: NODE_ENV === 'production'
        ? undefined
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              levelFirst: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
              messageFormat: '{msg}',
              timestampKey: 'time',
            },
          },
    },
    http: {
      reqId: () => crypto.randomUUID(),
    },

  })
}
