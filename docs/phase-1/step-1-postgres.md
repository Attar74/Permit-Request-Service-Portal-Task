# Phase 1 - Step 1.1: Provision PostgreSQL for Local Development

## What Was Done

Set up PostgreSQL database using Docker Compose for local development. Created configuration files and environment variable templates.

## Why It Was Done

- **Consistency**: Docker ensures the same PostgreSQL version across all development environments
- **Isolation**: Database runs in a container, separate from host system
- **Easy Setup**: One command (`docker compose up -d`) starts the database
- **Reproducibility**: Same configuration for all developers
- **Clean Environment**: Easy to reset database by removing container/volume

## Commands to Run

### Start PostgreSQL

From the root directory:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Or if you're in the `docker/` directory:

```bash
cd docker
docker compose up -d
```

### Verify PostgreSQL is Running

```bash
docker ps | grep postgres
```

### Check Database Connection

```bash
docker exec -it permit-service-postgres psql -U postgres -d permit_service
```

### Stop PostgreSQL

```bash
docker compose -f docker/docker-compose.yml down
```

### Stop and Remove Data (Reset Database)

```bash
docker compose -f docker/docker-compose.yml down -v
```

## Key Files/Paths Created

### Docker Configuration

1. **docker/docker-compose.yml**
   - PostgreSQL 16 Alpine image (lightweight)
   - Container name: `permit-service-postgres`
   - Port mapping: 5432 (configurable via env var)
   - Persistent volume: `postgres_data`
   - Health check: Ensures database is ready before connections
   - Environment variables from `.env` file

### Environment Configuration

2. **.env.example**
   - Template for environment variables
   - Database configuration:
     - `DATABASE_HOST`: localhost
     - `DATABASE_PORT`: 5432
     - `DATABASE_USER`: postgres
     - `DATABASE_PASSWORD`: postgres
     - `DATABASE_NAME`: permit_service
   - Backend API configuration:
     - `API_PORT`: 3001
     - `API_BASE_URL`: http://localhost:3001
   - Frontend configuration:
     - `NUXT_PORT`: 3000

### Documentation

3. **docs/phase-1/step-1-postgres.md** (this file)
   - Setup instructions
   - Commands reference

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

### Required Variables

- `DATABASE_HOST`: PostgreSQL host (default: localhost)
- `DATABASE_PORT`: PostgreSQL port (default: 5432)
- `DATABASE_USER`: Database user (default: postgres)
- `DATABASE_PASSWORD`: Database password (default: postgres)
- `DATABASE_NAME`: Database name (default: permit_service)

### Optional Variables

- `API_PORT`: Backend API port (default: 3001)
- `API_BASE_URL`: Backend API base URL (default: http://localhost:3001)
- `NUXT_PORT`: Frontend port (default: 3000)

## Database Details

- **Image**: postgres:16-alpine (PostgreSQL 16, Alpine Linux base)
- **Container Name**: permit-service-postgres
- **Default Port**: 5432
- **Default Database**: permit_service
- **Default User**: postgres
- **Volume**: postgres_data (persistent storage)

## Health Check

The Docker Compose configuration includes a health check that:
- Runs every 10 seconds
- Uses `pg_isready` to verify database is accepting connections
- Retries up to 5 times
- Ensures database is ready before other services connect

## Troubleshooting

### Port Already in Use

If port 5432 is already in use, change `DATABASE_PORT` in `.env`:

```env
DATABASE_PORT=5433
```

And update the docker-compose.yml port mapping accordingly.

### Connection Refused

1. Verify container is running: `docker ps`
2. Check logs: `docker logs permit-service-postgres`
3. Verify health check: `docker inspect permit-service-postgres | grep Health`

### Reset Database

To completely reset the database (removes all data):

```bash
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
```

## Next Steps

- Step 1.2: Bootstrap NestJS application with database connection
- Step 1.3: Implement Permit Application data model
- Step 1.4: Implement Backend API endpoints

## Commit

```bash
git add docker/docker-compose.yml .env.example docs/phase-1/step-1-postgres.md
git commit -m "phase(1): step(1.1) - Provision PostgreSQL for local dev"
```

