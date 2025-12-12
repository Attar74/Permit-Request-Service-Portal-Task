# Phase 1 - Step 1.2: Backend Bootstrapping (NestJS)

## What Was Done

Created and configured a NestJS application in `apps/api` with PostgreSQL database connection using TypeORM, environment configuration, and global validation pipes.

## Why It Was Done

- **NestJS Framework**: Provides a scalable, modular architecture for building REST APIs
- **TypeORM Integration**: Simplifies database operations with TypeScript decorators
- **Environment Configuration**: Centralized configuration management using `@nestjs/config`
- **Validation**: Global validation pipe ensures all incoming requests are validated
- **CORS Support**: Enabled CORS for frontend communication

## Commands to Run

### Create NestJS Application

```bash
npx --yes @nestjs/cli new apps/api --package-manager npm --skip-git --skip-install
```

### Install Dependencies

```bash
cd apps/api
npm install --legacy-peer-deps
```

### Start Development Server

```bash
cd apps/api
npm run start:dev
```

The API will be available at `http://localhost:3001` (or port specified in `API_PORT` env var).

### Verify Database Connection

Ensure PostgreSQL is running:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Then start the NestJS app - it should connect to the database automatically.

## Key Files/Paths Created/Modified

### Application Structure

```
apps/api/
├── src/
│   ├── app.module.ts      # Main application module with DB config
│   ├── app.controller.ts  # Default controller
│   ├── app.service.ts     # Default service
│   └── main.ts            # Application entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── nest-cli.json          # NestJS CLI configuration
```

### Modified Files

1. **apps/api/package.json**
   - Added dependencies:
     - `@nestjs/config@^4.0.2`: Environment configuration
     - `@nestjs/typeorm@^10.0.2`: TypeORM integration
     - `typeorm@^0.3.20`: TypeORM ORM
     - `pg@^8.13.1`: PostgreSQL driver
     - `class-validator@^0.14.1`: DTO validation
     - `class-transformer@^0.5.1`: DTO transformation

2. **apps/api/src/main.ts**
   - Added global validation pipe with:
     - `whitelist: true`: Strips non-whitelisted properties
     - `forbidNonWhitelisted: true`: Throws error for non-whitelisted properties
     - `transform: true`: Automatically transforms payloads to DTO instances
   - Enabled CORS for frontend communication
   - Configured port from `API_PORT` environment variable (default: 3001)
   - Added startup console log

3. **apps/api/src/app.module.ts**
   - Added `ConfigModule` with global scope
   - Configured to load `.env` file from root directory
   - Added `TypeOrmModule` with async configuration:
     - Reads database config from environment variables
     - Uses PostgreSQL driver
     - Auto-loads entities
     - Enables `synchronize` in development (auto-creates tables)

## Environment Variables

The application reads configuration from `.env` file in the root directory:

### Database Configuration
- `DATABASE_HOST`: PostgreSQL host (default: localhost)
- `DATABASE_PORT`: PostgreSQL port (default: 5432)
- `DATABASE_USER`: Database user (default: postgres)
- `DATABASE_PASSWORD`: Database password (default: postgres)
- `DATABASE_NAME`: Database name (default: permit_service)

### Application Configuration
- `API_PORT`: Backend API port (default: 3001)
- `NODE_ENV`: Environment mode (development/production)

## Database Connection

The TypeORM configuration:
- **Type**: PostgreSQL
- **Connection**: Uses environment variables from `.env`
- **Auto-load Entities**: Automatically discovers entity files
- **Synchronize**: Enabled in development (auto-creates/updates tables)
  - ⚠️ **Warning**: `synchronize: true` should be disabled in production
  - Use migrations in production instead

## Validation Pipeline

Global validation pipe is configured to:
1. **Whitelist**: Only properties defined in DTOs are allowed
2. **Forbid Non-Whitelisted**: Rejects requests with extra properties
3. **Transform**: Converts plain objects to DTO class instances
4. **Validate**: Validates all incoming requests using `class-validator` decorators

## CORS Configuration

CORS is enabled to allow frontend (Nuxt) to make requests to the API. This will be configured more specifically in later phases if needed.

## Next Steps

- Step 1.3: Implement Permit Application data model (entity, DTOs)
- Step 1.4: Implement Backend API endpoints (controller, service)

## Testing the Setup

1. Start PostgreSQL:
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```

2. Start NestJS:
   ```bash
   cd apps/api
   npm run start:dev
   ```

3. Verify:
   - Check console for: `🚀 Application is running on: http://localhost:3001`
   - Visit `http://localhost:3001` - should see default NestJS response
   - Check database connection in logs (no errors)

## Commit

```bash
git add apps/api/
git commit -m "phase(1): step(1.2) - Backend bootstrapping with NestJS"
```

