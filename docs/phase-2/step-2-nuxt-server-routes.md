# Phase 2 - Step 2.2: Implement Nuxt Server Routes as API Gateway

## What Was Done

Created Nuxt Server Routes that act as an API Gateway between the frontend and backend. Implemented `GET /api/permits` and `POST /api/permits` endpoints that internally call the NestJS backend.

## Why It Was Done

- **API Gateway Pattern**: All frontend API calls go through Nuxt server routes
- **Security**: Backend API URL is never exposed to the client
- **Centralized Management**: Single point for API request/response transformation
- **Error Handling**: Consistent error handling and formatting
- **Type Safety**: Full TypeScript support with shared types

## Commands to Run

### Test Server Routes

Start the Nuxt development server:

```bash
cd apps/web
npm run dev
```

### Test GET Endpoint

```bash
curl http://localhost:3000/api/permits
```

### Test POST Endpoint

```bash
curl -X POST http://localhost:3000/api/permits \
  -H "Content-Type: application/json" \
  -d '{
    "applicantName": "Ahmed Ali",
    "applicantEmail": "ahmed@example.com",
    "permitType": "Construction Permit"
  }'
```

## Key Files/Paths Created

### Server Routes

1. **apps/web/server/api/permits.get.ts**
   - Handles `GET /api/permits` requests
   - Fetches all permit applications from backend
   - Returns array of `PermitApplication[]`
   - Error handling with proper HTTP status codes
   - Uses `useRuntimeConfig()` to get `apiBaseUrl`

2. **apps/web/server/api/permits.post.ts**
   - Handles `POST /api/permits` requests
   - Validates required fields (applicantName, applicantEmail, permitType)
   - Creates new permit application via backend
   - Returns created `PermitApplication`
   - Error handling with backend error message propagation

## API Gateway Pattern

### Request Flow

```
Frontend (Browser)
  ↓
  HTTP Request to /api/permits
  ↓
Nuxt Server Route (server/api/permits.*.ts)
  ↓
  Internal fetch() to backend
  ↓
NestJS Backend (http://localhost:3001/permits)
  ↓
  Database Query
  ↓
PostgreSQL Database
```

### Benefits

1. **Security**
   - Backend URL (`API_BASE_URL`) is server-side only
   - Never exposed to client JavaScript
   - Prevents direct client access to backend

2. **Centralized Logic**
   - Request/response transformation in one place
   - Consistent error handling
   - Easy to add authentication, rate limiting, caching

3. **Flexibility**
   - Can switch backend implementations without frontend changes
   - Can aggregate data from multiple backends
   - Can add request/response logging

4. **Type Safety**
   - Shared types between server routes and frontend
   - TypeScript ensures consistency
   - Compile-time error checking

## Endpoints

### GET /api/permits

**Description**: Retrieve all permit applications

**Method**: `GET`

**URL**: `http://localhost:3000/api/permits`

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
  }
]
```

**Error Response**: `500 Internal Server Error`

```json
{
  "statusCode": 500,
  "statusMessage": "Failed to fetch permits: Connection refused"
}
```

### POST /api/permits

**Description**: Create a new permit application

**Method**: `POST`

**URL**: `http://localhost:3000/api/permits`

**Request Body**:

```json
{
  "applicantName": "Ahmed Ali",
  "applicantEmail": "ahmed@example.com",
  "permitType": "Construction Permit"
}
```

**Response**: `200 OK`

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

**Error Responses**:

- `400 Bad Request` (missing fields):

```json
{
  "statusCode": 400,
  "statusMessage": "Missing required fields: applicantName, applicantEmail, permitType"
}
```

- `400 Bad Request` (backend validation error):

```json
{
  "statusCode": 400,
  "statusMessage": ["Applicant email must be a valid email address"]
}
```

- `500 Internal Server Error`:

```json
{
  "statusCode": 500,
  "statusMessage": "Failed to create permit: Connection refused"
}
```

## Implementation Details

### Runtime Configuration

Server routes access `apiBaseUrl` from `nuxt.config.ts`:

```typescript
const config = useRuntimeConfig();
const apiBaseUrl = config.apiBaseUrl; // http://localhost:3001
```

This value is:

- Server-side only (not exposed to client)
- Read from `API_BASE_URL` environment variable
- Defaults to `http://localhost:3001` if not set

### Error Handling

Both routes use Nuxt's `createError()` for consistent error responses:

- Preserves backend error status codes
- Propagates backend error messages
- Provides fallback error messages for network errors
- Returns proper HTTP status codes

### Type Safety

- Uses shared types from `types/permit.ts`
- TypeScript ensures request/response types match
- Compile-time checking prevents type mismatches

## Environment Variables

- `API_BASE_URL`: Backend API base URL (default: `http://localhost:3001`)

Set in `.env` file in root directory:

```env
API_BASE_URL=http://localhost:3001
```

## Testing

### Prerequisites

1. Start PostgreSQL:

   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```

2. Start NestJS backend:

   ```bash
   cd apps/api
   npm run start:dev
   ```

3. Start Nuxt frontend:
   ```bash
   cd apps/web
   npm run dev
   ```

### Test Scenarios

1. **GET /api/permits** (empty list):

   ```bash
   curl http://localhost:3000/api/permits
   ```

   Expected: `[]`

2. **POST /api/permits** (create):

   ```bash
   curl -X POST http://localhost:3000/api/permits \
     -H "Content-Type: application/json" \
     -d '{"applicantName":"Test","applicantEmail":"test@example.com","permitType":"Test"}'
   ```

   Expected: Created permit object

3. **GET /api/permits** (with data):

   ```bash
   curl http://localhost:3000/api/permits
   ```

   Expected: Array with created permit

4. **POST /api/permits** (validation error):
   ```bash
   curl -X POST http://localhost:3000/api/permits \
     -H "Content-Type: application/json" \
     -d '{"applicantName":"Test","applicantEmail":"invalid"}'
   ```
   Expected: `400 Bad Request` with validation error

## Next Steps

- Step 2.3: Home Page listing applications (use `useFetch('/api/permits')`)
- Step 2.4: Apply Page with form (submit to `/api/permits`)

## Commit

```bash
git add apps/web/server/
git commit -m "phase(2): step(2.2) - Implement Nuxt Server Routes as API Gateway"
```
