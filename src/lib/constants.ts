import * as HttpStatusPhrases from '@/lib/http-status-phrases.js'
import createMessageObjectSchema from '@/openapi/schemas/create-message-object.js'

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)
