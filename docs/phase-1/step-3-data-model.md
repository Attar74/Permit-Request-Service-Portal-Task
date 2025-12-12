# Phase 1 - Step 1.3: Implement Permit Application Data Model

## What Was Done

Created the Permit Application data model with TypeORM entity, DTOs (Data Transfer Objects) for validation, and registered the entity in the application module.

## Why It Was Done

- **TypeORM Entity**: Defines the database schema and provides type-safe database operations
- **DTOs**: Ensure data validation and type safety for API requests/responses
- **Enum for Status**: Type-safe status values (Pending/Approved/Rejected)
- **Automatic Timestamps**: `submitted_at` automatically set on creation
- **Validation**: Client and server-side validation using `class-validator`

## Commands to Run

No additional commands needed. The entity will be automatically synchronized with the database when the application starts (in development mode).

To verify the table was created:

```bash
# Connect to PostgreSQL
docker exec -it permit-service-postgres psql -U postgres -d permit_service

# List tables
\dt

# Describe permit_applications table
\d permit_applications
```

## Key Files/Paths Created

### Entity

1. **apps/api/src/permits/entities/permit-application.entity.ts**
   - TypeORM entity defining the database schema
   - Fields:
     - `id`: Auto-generated primary key
     - `applicantName`: Required text field (mapped to `applicant_name` column)
     - `applicantEmail`: Required text field (mapped to `applicant_email` column)
     - `permitType`: Required text field (mapped to `permit_type` column)
     - `applicationStatus`: Enum field with default value `PENDING` (mapped to `application_status`)
     - `submittedAt`: Auto-generated timestamp on creation (mapped to `submitted_at`)
   - Table name: `permit_applications` (snake_case for PostgreSQL convention)

### DTOs (Data Transfer Objects)

2. **apps/api/src/permits/dto/create-permit-application.dto.ts**
   - DTO for creating new permit applications
   - Validation rules:
     - `applicantName`: Required, must be a string
     - `applicantEmail`: Required, must be a valid email address
     - `permitType`: Required, must be a string
   - Used for POST `/permits` endpoint validation

3. **apps/api/src/permits/dto/permit-application-response.dto.ts**
   - DTO for API responses
   - Includes all fields from the entity
   - Used for consistent API response structure

### Module Updates

4. **apps/api/src/app.module.ts**
   - Added `PermitApplication` entity to TypeORM configuration
   - Registered entity with `TypeOrmModule.forFeature([PermitApplication])`
   - Enables repository injection in services

## Data Model Schema

### Database Table: `permit_applications`

| Column Name          | Type      | Constraints                    | Description                    |
|---------------------|-----------|--------------------------------|--------------------------------|
| `id`                | SERIAL    | PRIMARY KEY                    | Auto-incrementing ID           |
| `applicant_name`    | VARCHAR   | NOT NULL                       | Applicant's full name          |
| `applicant_email`   | VARCHAR   | NOT NULL                       | Applicant's email address      |
| `permit_type`       | VARCHAR   | NOT NULL                       | Type of permit requested       |
| `application_status`| ENUM      | NOT NULL, DEFAULT 'Pending'   | Status: Pending/Approved/Rejected |
| `submitted_at`      | TIMESTAMP | NOT NULL, AUTO                 | Application submission time    |

### ApplicationStatus Enum

```typescript
enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}
```

Default value: `PENDING`

## Validation Rules

### CreatePermitApplicationDto

- **applicantName**:
  - Required (cannot be empty)
  - Must be a string
  - Error message: "Applicant name is required"

- **applicantEmail**:
  - Required (cannot be empty)
  - Must be a valid email format
  - Error message: "Applicant email is required" or "Applicant email must be a valid email address"

- **permitType**:
  - Required (cannot be empty)
  - Must be a string
  - Error message: "Permit type is required"

## Environment Variables

No new environment variables added in this step.

## Database Migration

In development mode, TypeORM's `synchronize: true` automatically creates/updates the table schema. When the application starts:

1. TypeORM reads the entity definition
2. Compares with existing database schema
3. Creates/updates the `permit_applications` table if needed
4. Creates the enum type for `application_status`

⚠️ **Note**: `synchronize: true` should be disabled in production. Use migrations instead.

## Testing the Data Model

1. Start PostgreSQL:
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```

2. Start NestJS application:
   ```bash
   cd apps/api
   npm run start:dev
   ```

3. Verify table creation:
   ```bash
   docker exec -it permit-service-postgres psql -U postgres -d permit_service -c "\d permit_applications"
   ```

You should see the table structure with all columns and constraints.

## Next Steps

- Step 1.4: Implement Backend API endpoints (GET /permits, POST /permits)

## Commit

```bash
git add apps/api/src/permits/
git add apps/api/src/app.module.ts
git commit -m "phase(1): step(1.3) - Implement Permit Application data model"
```

