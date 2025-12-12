# Phase 1 - Step 1.4: Implement Backend API Endpoints

## What Was Done

Implemented REST API endpoints for permit applications: GET `/permits` (list all) and POST `/permits` (create new). Created controller, service, and module following NestJS best practices.

## Why It Was Done

- **RESTful API**: Standard HTTP methods for CRUD operations
- **Separation of Concerns**: Controller handles HTTP, Service handles business logic
- **Modular Architecture**: PermitsModule encapsulates all permit-related functionality
- **Type Safety**: Full TypeScript support with DTOs and entities
- **Validation**: Automatic validation using class-validator decorators
- **Repository Pattern**: TypeORM repository for database operations

## Commands to Run

### Start the Application

```bash
# Ensure PostgreSQL is running
docker compose -f docker/docker-compose.yml up -d

# Start NestJS backend
cd apps/api
npm run start:dev
```

### Test Endpoints

#### GET /permits (List all applications)

```bash
curl http://localhost:3001/permits
```

Expected response (empty array initially):
```json
[]
```

#### POST /permits (Create new application)

```bash
curl -X POST http://localhost:3001/permits \
  -H "Content-Type: application/json" \
  -d '{
    "applicantName": "Ahmed Ali",
    "applicantEmail": "ahmed@example.com",
    "permitType": "Construction Permit"
  }'
```

Expected response:
```json
{
  "id": 1,
  "applicantName": "Ahmed Ali",
  "applicantEmail": "ahmed@example.com",
  "permitType": "Construction Permit",
  "applicationStatus": "Pending",
  "submittedAt": "2024-12-12T14:30:00.000Z"
}
```

#### Test Validation

Invalid email:
```bash
curl -X POST http://localhost:3001/permits \
  -H "Content-Type: application/json" \
  -d '{
    "applicantName": "Ahmed Ali",
    "applicantEmail": "invalid-email",
    "permitType": "Construction Permit"
  }'
```

Expected response (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": ["Applicant email must be a valid email address"],
  "error": "Bad Request"
}
```

Missing required field:
```bash
curl -X POST http://localhost:3001/permits \
  -H "Content-Type: application/json" \
  -d '{
    "applicantName": "Ahmed Ali",
    "applicantEmail": "ahmed@example.com"
  }'
```

Expected response (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": ["permitType should not be empty"],
  "error": "Bad Request"
}
```

## Key Files/Paths Created

### Service Layer

1. **apps/api/src/permits/permits.service.ts**
   - Business logic for permit operations
   - Methods:
     - `findAll()`: Retrieves all permit applications, ordered by submission date (newest first)
     - `create(createPermitDto)`: Creates a new permit application with status "Pending"
   - Uses TypeORM repository for database operations
   - Automatically sets `applicationStatus` to `PENDING` on creation

### Controller Layer

2. **apps/api/src/permits/permits.controller.ts**
   - HTTP request/response handling
   - Endpoints:
     - `GET /permits`: Returns all permit applications
     - `POST /permits`: Creates a new permit application
   - Uses DTOs for request validation
   - Returns appropriate HTTP status codes:
     - `200 OK` for GET requests
     - `201 Created` for POST requests

### Module

3. **apps/api/src/permits/permits.module.ts**
   - Organizes permits-related functionality
   - Imports: `TypeOrmModule.forFeature([PermitApplication])` for repository injection
   - Exports: `PermitsService` (for potential use in other modules)
   - Declares: `PermitsController`, `PermitsService`

### Module Updates

4. **apps/api/src/app.module.ts**
   - Added `PermitsModule` to imports
   - Enables the `/permits` endpoints

## API Endpoints

### GET /permits

**Description**: Retrieve all permit applications

**Method**: `GET`

**URL**: `http://localhost:3001/permits`

**Response**: `200 OK`

```json
[
  {
    "id": 1,
    "applicantName": "Ahmed Ali",
    "applicantEmail": "ahmed@example.com",
    "permitType": "Construction Permit",
    "applicationStatus": "Pending",
    "submittedAt": "2024-12-12T14:30:00.000Z"
  },
  {
    "id": 2,
    "applicantName": "Sara Mohammed",
    "applicantEmail": "sara@example.com",
    "permitType": "Business License",
    "applicationStatus": "Approved",
    "submittedAt": "2024-12-11T10:15:00.000Z"
  }
]
```

**Ordering**: Results are ordered by `submittedAt` descending (newest first)

### POST /permits

**Description**: Create a new permit application

**Method**: `POST`

**URL**: `http://localhost:3001/permits`

**Request Body**:
```json
{
  "applicantName": "Ahmed Ali",
  "applicantEmail": "ahmed@example.com",
  "permitType": "Construction Permit"
}
```

**Validation Rules**:
- `applicantName`: Required, must be a string
- `applicantEmail`: Required, must be a valid email address
- `permitType`: Required, must be a string

**Response**: `201 Created`

```json
{
  "id": 1,
  "applicantName": "Ahmed Ali",
  "applicantEmail": "ahmed@example.com",
  "permitType": "Construction Permit",
  "applicationStatus": "Pending",
  "submittedAt": "2024-12-12T14:30:00.000Z"
}
```

**Error Response**: `400 Bad Request` (validation errors)

```json
{
  "statusCode": 400,
  "message": [
    "Applicant name is required",
    "Applicant email must be a valid email address"
  ],
  "error": "Bad Request"
}
```

## Architecture

### Request Flow

1. **Client** → HTTP Request → **Controller**
2. **Controller** → Validates DTO → **Service**
3. **Service** → Uses Repository → **Database**
4. **Database** → Returns Data → **Service**
5. **Service** → Returns Entity → **Controller**
6. **Controller** → Returns JSON → **Client**

### Dependency Injection

- `PermitsController` injects `PermitsService`
- `PermitsService` injects `Repository<PermitApplication>`
- Repository is provided by `TypeOrmModule.forFeature([PermitApplication])`

## Environment Variables

No new environment variables added in this step.

## Error Handling

Validation errors are automatically handled by the global `ValidationPipe`:
- Invalid data returns `400 Bad Request`
- Error messages are clear and descriptive
- Multiple validation errors are returned as an array

## Testing

### Manual Testing

Use `curl` or Postman to test endpoints as shown in "Commands to Run" section.

### Automated Testing

NestJS provides testing utilities. Example test structure:

```typescript
// permits.controller.spec.ts
describe('PermitsController', () => {
  // Test GET /permits
  // Test POST /permits
  // Test validation errors
});
```

## Next Steps

- Phase 2: Create Nuxt 4 frontend
- Phase 2 Step 2.2: Implement Nuxt Server Routes as API Gateway
- Phase 2 Step 2.3: Home Page listing applications
- Phase 2 Step 2.4: Apply Page with form

## Commit

```bash
git add apps/api/src/permits/
git add apps/api/src/app.module.ts
git commit -m "phase(1): step(1.4) - Implement Backend API endpoints"
```

