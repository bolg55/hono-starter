import { pinoLogger } from 'hono-pino'
import pretty from 'pino-pretty'

export function logger() {
  return pinoLogger({
    pino: process.env.NODE_ENV === 'production' ? undefined : pretty(),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
