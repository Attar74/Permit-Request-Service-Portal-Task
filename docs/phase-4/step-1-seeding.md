# Phase 4 - Step 4.1: Add Seed/Dev Data

## What Was Done

Created a database seeding script to populate the database with sample permit applications for development and testing purposes.

## Why It Was Done

- **Development**: Provides sample data for testing and development
- **Demo**: Ready-to-use data for demonstrations
- **Testing**: Ensures the application works with real data
- **Documentation**: Shows example data structure
- **Quick Start**: Developers can start with populated data

## Commands to Run

### Prerequisites

Ensure PostgreSQL is running:

```bash
docker compose -f docker/docker-compose.yml up -d
```

### Run Seed Script

From the `apps/api` directory:

```bash
cd apps/api
npm run seed
```

### Expected Output

```
📦 Database connected
✅ Seeded 5 permit applications
✅ Seed completed successfully
```

### Reset and Re-seed

To clear existing data and re-seed:

1. **Option 1: Reset database (removes all data)**
   ```bash
   docker compose -f docker/docker-compose.yml down -v
   docker compose -f docker/docker-compose.yml up -d
   cd apps/api
   npm run seed
   ```

2. **Option 2: Manual SQL (if you want to keep some data)**
   ```sql
   TRUNCATE TABLE permit_applications RESTART IDENTITY CASCADE;
   ```

## Key Files/Paths Created

### Seed Files

1. **apps/api/src/permits/permits.seed.ts**
   - Seed function for permit applications
   - Creates 5 sample permit applications
   - Checks if data already exists (prevents duplicates)
   - Sample data includes:
     - Various applicant names (Arabic names)
     - Different email addresses
     - Different permit types
     - All three status types (Pending, Approved, Rejected)

2. **apps/api/src/scripts/seed.ts**
   - Standalone seed script
   - Connects to database
   - Calls seed functions
   - Handles errors gracefully
   - Exits with proper status codes

### Package.json Update

3. **apps/api/package.json**
   - Added `seed` script:
     ```json
     "seed": "ts-node -r tsconfig-paths/register src/scripts/seed.ts"
     ```

## Sample Data

The seed script creates 5 permit applications:

1. **Ahmed Ali Al-Saud**
   - Email: ahmed.ali@example.com
   - Permit Type: Construction Permit
   - Status: Pending

2. **Fatima Mohammed**
   - Email: fatima.m@example.com
   - Permit Type: Business License
   - Status: Approved

3. **Khalid Ibrahim**
   - Email: khalid.i@example.com
   - Permit Type: Event Permit
   - Status: Rejected

4. **Sara Abdullah**
   - Email: sara.a@example.com
   - Permit Type: Renovation Permit
   - Status: Pending

5. **Mohammed Hassan**
   - Email: mohammed.h@example.com
   - Permit Type: Commercial License
   - Status: Approved

## Usage

### Development

Run seed script once to populate database:

```bash
cd apps/api
npm run seed
```

### Testing

Seed script is idempotent - it won't create duplicates if data exists. To re-seed:

1. Clear database (see "Reset and Re-seed" above)
2. Run seed script again

### CI/CD

Can be integrated into CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Seed database
  run: |
    cd apps/api
    npm run seed
```

## Environment Variables

Uses the same environment variables as the main application:

- `DATABASE_HOST`: PostgreSQL host (default: localhost)
- `DATABASE_PORT`: PostgreSQL port (default: 5432)
- `DATABASE_USER`: Database user (default: postgres)
- `DATABASE_PASSWORD`: Database password (default: postgres)
- `DATABASE_NAME`: Database name (default: permit_service)

## Safety Features

1. **Duplicate Prevention**: Checks if data exists before seeding
2. **Error Handling**: Graceful error handling with proper exit codes
3. **Connection Management**: Properly closes database connections
4. **Logging**: Clear console output for success/failure

## Customization

To add more sample data, edit `apps/api/src/permits/permits.seed.ts`:

```typescript
const samplePermits: Partial<PermitApplication>[] = [
  // Add your sample data here
  {
    applicantName: 'Your Name',
    applicantEmail: 'your.email@example.com',
    permitType: 'Your Permit Type',
    applicationStatus: ApplicationStatus.PENDING,
  },
];
```

## Verification

After seeding, verify data:

1. **Via API**:
   ```bash
   curl http://localhost:3001/permits
   ```

2. **Via Database**:
   ```bash
   docker exec -it permit-service-postgres psql -U postgres -d permit_service -c "SELECT * FROM permit_applications;"
   ```

3. **Via Frontend**:
   - Visit `http://localhost:3000`
   - Should see 5 permit applications in the table

## Troubleshooting

### Error: Cannot connect to database

- Ensure PostgreSQL is running: `docker compose -f docker/docker-compose.yml up -d`
- Check environment variables in `.env` file
- Verify database credentials

### Error: Table doesn't exist

- Run the NestJS application first to create tables:
  ```bash
  cd apps/api
  npm run start:dev
  ```
- Then run seed script

### Data already exists

- This is expected behavior - seed script won't create duplicates
- To re-seed, clear database first (see "Reset and Re-seed" above)

## Next Steps

- Step 4.2: Final README with end-to-end setup
- Step 4.3: Presentation notes

## Commit

```bash
git add apps/api/src/permits/permits.seed.ts apps/api/src/scripts/seed.ts apps/api/package.json
git commit -m "phase(4): step(4.1) - Add seed/dev data"
```

