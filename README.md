# Hono TypeScript API Starter

A modern, type-safe API starter template built with Hono, TypeScript, Drizzle ORM, Turso (libSQL), and Zod validation. This template follows best practices for building maintainable, production-ready APIs with a focus on developer experience and code quality.

## Features

- 🚀 **[Hono](https://hono.dev/)** - Ultra fast web framework for the Edges
- 🔍 **Type Safety** - End-to-end type safety with TypeScript
- 📝 **OpenAPI Documentation** - Automatic OpenAPI doc generation with `@hono/zod-openapi`
- 🔄 **Database ORM** - [Drizzle ORM](https://orm.drizzle.team/) with Turso/libSQL integration
- ✅ **Validation** - Request validation with Zod
- 📊 **Logging** - Structured logging with Pino
- 🧪 **Environment Management** - Type-safe environment variables with validation
- 🔐 **Security** - Built-in security best practices
- 📦 **Modern JS** - ESM-first approach with latest Node.js features
- 🛠️ **Developer Experience** - Hot reloading, linting, and formatting
- 🏗️ **Feature-based Organization** - Clean, scalable project structure
- 🚦 **Error Handling** - Centralized error handling with consistent responses
- 🧩 **Modular Design** - Separation of concerns for better maintainability

## Project structure

```

├── drizzle.config.ts # Drizzle ORM configuration
├── env.example # Example environment variables
├── eslint.config.js # ESLint configuration
├── LICENSE # Project license
├── package.json # Project dependencies
├── src/
│ ├── app.ts # App configuration
│ ├── db/
│ │ ├── index.ts # Database client setup
│ │ ├── migrations/ # Database migrations
│ │ └── schema/ # Database schema definitions
│ │ ├── index.ts # Re-exports all schemas
│ │ └── tasks.schema.ts
│ ├── env.ts # Environment configuration
│ ├── index.ts # Entry point
│ ├── lib/ # Shared utilities
│ │ ├── configure-open-api.ts
│ │ ├── constants.ts
│ │ ├── create-app.ts
│ │ ├── http-status-codes.ts
│ │ ├── http-status-phrases.ts
│ │ └── types.ts
│ ├── middlewares/ # Hono middleware
│ │ ├── index.ts
│ │ ├── not-found.ts
│ │ ├── on-error.ts
│ │ ├── pino-logger.ts
│ │ └── serve-emoji-favicon.ts
│ ├── openapi/ # OpenAPI utilities and schemas
│ │ ├── default-hook.ts
│ │ ├── helpers/
│ │ │ ├── json-content-one-of.ts
│ │ │ ├── json-content-required.ts
│ │ │ ├── json-content.ts
│ │ │ ├── one-of.ts
│ │ │ └── types.ts
│ │ └── schemas/
│ │ ├── create-error-schema.ts
│ │ ├── create-message-object.ts
│ │ ├── get-params-schema.ts
│ │ ├── id-params.ts
│ │ ├── id-uuid-params.ts
│ │ └── slug-params.ts
│ └── routes/ # API routes
│ ├── index.route.ts # Main router
│ └── tasks/ # Feature-based route organization
│ ├── tasks.handlers.ts
│ ├── tasks.index.ts
│ ├── tasks.routes.ts
│ └── tasks.services.ts
└── tsconfig.json # TypeScript configuration

```

## Getting started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Turso CLI (for database setup)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hono-api-starter.git
cd hono-api-starter
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Configure your database:

```bash
turso db create my-app-db
turso db tokens create my-app-db
```

5. Update your `.env` file with the Turso database URL and token:

```bash
DATABASE_URL=libsql://your-db-url.turso.io
DATABASE_AUTH_TOKEN=your-token
```

6. Run migrations:

```bash
pnpm db:migrate
```

> [!NOTE]
> There's a known issue with Drizzle where imports with `.js` extensions in TypeScript projects can cause "Cannot find module" errors when running migrations. The `db:generate` script in this project already implements the necessary workaround:
>
> ```bash
> NODE_OPTIONS='--import tsx' drizzle-kit generate
> ```
>
> See [Drizzle GitHub issue #2705](https://github.com/drizzle-team/drizzle-orm/issues/2705) for more details. 7. Start the development server:

```bash
pnpm run dev
```

The API will be available at http://localhost:8080.

## API documentation

The API is documented using OpenAPI 3.0 specifications, which are automatically generated from your route definitions and Zod schemas. This provides:

- Interactive API documentation
- Request/response schema validation
- Type safety between documentation and implementation

Documentation is available at:

- `/api-docs` - [Scalar](https://scalar.com/) interface for exploring and testing the API
  The OpenAPI configuration is set up in `src/lib/configure-open-api.ts` and integrates with your route definitions using `@hono/zod-openapi`.

## Environment variables

The application uses Zod to validate environment variables, ensuring type safety and validation at runtime:
| Variable | Description | Default | Required |
|---|---|---|---|
|PORT| Server port | 8080 | No|
|NODE_ENV| Environment|development|No|
|LOG_LEVEL|Logging level (fatal, error, warn, info, debug, trace)|debug|Yes|
|DATABASE_URL|Turso database URL|-|Yes|
|DATABASE_AUTH_TOKEN|Turso auth token|-|Production only|

Invalid environment variables will cause the application to exit with a helpful error message.

## Project concepts

### Route structure

Routes follow a feature-based organization:

```
routes/
├── index.route.ts       # Main router entry point
└── tasks/               # Feature folder
    ├── tasks.index.ts   # Route definitions and OpenAPI specs
    ├── tasks.routes.ts  # Route configurations
    ├── tasks.handlers.ts # Request handlers
    └── tasks.services.ts # Business logic and data access
```

### Error handling

The application uses a centralized error handling system through the `onError` middleware, providing consistent error responses:

```json
{
  "message": "Error message",
  "stack": "Error stack (development only)"
}
```

### Database access

Database operations are abstracted through service functions:

```typescript
// Example service function
export async function getTaskById(id: number) {
  return await db.query.tasks.findFirst({
    where: eq(tasks.id, id)
  })
}
```

## Development

### Creating new routes

1. Create a new folder in `routes/` for your feature (e.g., `users/`)
2. Create the following files:
   - `users.index.ts` - Main entry point for the feature's routes
   - `users.routes.ts` - Route definitions with OpenAPI specs
   - `users.handlers.ts` - Request handlers
   - `users.services.ts` - Business logic and data access

Register your routes in `app.ts`:

```typescript
// app.ts
import users from '@/routes/users/users.index.js'

const routes = [index, tasks, users]

routes.forEach((route) => {
  app.route('/', route)
})
```

### Working with database

The project uses Drizzle ORM with Turso (libSQL) for database operations. This provides a type-safe approach to database access with a clean API.

### Defining Schemas

1.  Create a new schema file in `src/db/schema/`:

```typescript
// src/db/schema/users.schema.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
})

// Create Zod schemas for type validation and OpenAPI documentation
export const selectUsersSchema = createSelectSchema(users)
export const insertUsersSchema = createInsertSchema(users, {
  name: schema => schema.min(1).max(255),
  email: schema => schema.email(),
})
  .omit({ id: true, createdAt: true, updatedAt: true })
```

2. Export your schema in `src/db/schema/index.ts`:

```typescript
export * from './tasks.schema.js'
export * from './users.schema.js'
```

### Working with migrations

1. Generate migrations:

```bash
pnpm db:generate
```

2. Apply migrations:

```bash
pnpm db:migrate
```

### Creating Service Functions

Service functions encapsulate database operations and business logic:

```typescript
import { eq } from 'drizzle-orm'

import type { User } from '@/db/schema'

// src/routes/users/users.services.ts
import { db } from '@/db'
import { users } from '@/db/schema'

export async function getUserById(id: number): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))

  return user || null
}

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  const [user] = await db
    .insert(users)
    .values(data)
    .returning()

  return user
}
```

## Deployment

### Production Build

```bash
pnpm run build
pnpm run start
```

### Deploying to Production

This template works well with:

- Node.js environments
- Docker containers
- Serverless platforms (with minor adjustments)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Related Projects

Looking for PostgreSQL support? Check out our companion project [hono-neon-starter](https://github.com/yourusername/hono-neon-starter) (coming soon).

## Acknowledgements

This project was inspired by [hono-open-api-starter](https://github.com/w3cj/hono-open-api-starter) by [CJ](https://github.com/w3cj). Thanks for the excellent foundation!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
