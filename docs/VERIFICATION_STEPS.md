# Verification Steps - Permit Request Service Portal

This document provides copy-paste commands to verify all requirements are met.

## Prerequisites

Ensure you have:
- Node.js v20.x or later
- Docker and Docker Compose
- npm v10.x or later

## Step 1: Start PostgreSQL Database

```bash
# Start PostgreSQL using Docker Compose
docker compose -f docker/docker-compose.yml up -d

# Verify PostgreSQL is running
docker ps | grep postgres

# Expected output: Container named "permit-service-postgres" should be running
```

## Step 2: Install Dependencies

```bash
# Install root dependencies (Prettier)
npm install

# Install backend dependencies
cd apps/api
npm install

# Install frontend dependencies
cd ../web
npm install
```

## Step 3: Setup Environment Variables

```bash
# Copy example env file (if not exists)
cd ../..
cp .env.example .env

# Verify .env contains required variables
cat .env | grep -E "DATABASE_|API_|NUXT_"
```

## Step 4: Seed Database (Optional)

```bash
# Seed database with sample data
cd apps/api
npm run seed

# Expected output: "Seeded 5 permit applications"
```

## Step 5: Start Backend

```bash
# Start NestJS backend (in apps/api directory)
cd apps/api
npm run start:dev

# Expected output: "Nest application successfully started on http://localhost:3001"
# Keep this terminal running
```

## Step 6: Start Frontend

```bash
# In a new terminal, start Nuxt frontend
cd apps/web
npm run dev

# Expected output: "Local: http://localhost:3000"
# Keep this terminal running
```

## Step 7: Verify Home Page Lists All Permits

1. Open browser: `http://localhost:3000`
2. **Expected**: 
   - Page title: "Permit Request Service Portal"
   - List of permit applications (if seeded)
   - Status badges with colors (Pending=yellow, Approved=green, Rejected=red)
   - Applications displayed in table (desktop) or cards (mobile)

**Verify API Gateway Pattern**:
```bash
# Check browser Network tab when loading home page
# Should see request to: http://localhost:3000/api/permits
# Should NOT see direct calls to http://localhost:3001
```

## Step 8: Verify Apply Page Submits New Permit

1. Navigate to: `http://localhost:3000/apply`
2. Fill out the form:
   - Applicant Name: "Test User"
   - Email Address: "test@example.com"
   - Permit Type: "Test Permit"
3. Click "Submit Application"
4. **Expected**: 
   - Redirects to home page (`/`)
   - New application appears in the list
   - Status shows as "Pending" (yellow badge)

**Verify API Gateway Pattern**:
```bash
# Check browser Network tab when submitting
# Should see POST request to: http://localhost:3000/api/permits
# Should NOT see direct calls to http://localhost:3001
```

## Step 9: Verify Status Visualization

1. On home page, check status badges
2. **Expected**:
   - Pending: Yellow badge with clock icon
   - Approved: Green badge with check icon
   - Rejected: Red badge with X icon
3. Status should be clearly distinguishable by color

## Step 10: Verify RTL Support

1. Open browser console (F12)
2. Run:
   ```javascript
   document.documentElement.setAttribute('dir', 'rtl');
   ```
3. **Expected**:
   - Layout flips to right-to-left
   - Navigation moves to right side
   - Text aligns to right
   - Icons and elements flip positions

**Alternative**: Use language toggle button in header (flag icon) to switch to Arabic

## Step 11: Verify Responsive Layout

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Test at different screen sizes:

   **Mobile (375px)**:
   - Navigation should be compact
   - Applications should display as cards (not table)
   - Form should be full-width
   - Buttons should stack vertically

   **Tablet (768px)**:
   - Table view should appear
   - Some columns may be hidden
   - Form should have max-width

   **Desktop (1280px)**:
   - Full table with all columns visible
   - Form should be centered with max-width
   - Optimal spacing and layout

## Step 12: Verify API Gateway Pattern (Server Routes)

**Check Server Routes Exist**:
```bash
# Verify GET route exists
ls -la apps/web/server/api/permits.get.ts

# Verify POST route exists
ls -la apps/web/server/api/permits.post.ts
```

**Verify No Direct Backend Calls from Frontend**:
```bash
# Search for direct backend URLs in frontend code
grep -r "localhost:3001" apps/web/app/ apps/web/components/

# Expected: No results (or only in server routes)
```

**Verify Server Routes Call Backend**:
```bash
# Check GET route calls backend
grep "fetch" apps/web/server/api/permits.get.ts

# Check POST route calls backend
grep "fetch" apps/web/server/api/permits.post.ts

# Both should show fetch calls to apiBaseUrl
```

## Step 13: Verify Data Model

**Check Entity**:
```bash
# Verify all required fields exist
grep -E "applicantName|applicantEmail|permitType|applicationStatus|submittedAt" \
  apps/api/src/permits/entities/permit-application.entity.ts
```

**Check Validation**:
```bash
# Verify email validation
grep "@IsEmail" apps/api/src/permits/dto/create-permit-application.dto.ts

# Verify required fields
grep "@IsNotEmpty" apps/api/src/permits/dto/create-permit-application.dto.ts
```

**Check Status Enum**:
```bash
# Verify enum values
grep -A 3 "ApplicationStatus" apps/api/src/permits/entities/permit-application.entity.ts

# Should show: PENDING, APPROVED, REJECTED
```

## Step 14: Verify Tech Stack

**Check Nuxt Version**:
```bash
grep '"nuxt"' apps/web/package.json
# Should show: "nuxt": "^4.0.0"
```

**Check NestJS**:
```bash
grep "@nestjs" apps/api/package.json | head -5
# Should show multiple @nestjs packages
```

**Check PostgreSQL**:
```bash
grep "postgres" docker/docker-compose.yml
# Should show: image: postgres:16-alpine
```

## Step 15: Verify Deliverables

**Check README**:
```bash
# Verify setup steps exist
grep -A 10 "Quick Start" README.md
```

**Check Presentation Notes**:
```bash
# Verify presentation notes exist
head -5 docs/PRESENTATION_NOTES.md
# Should show "Duration: 5-10 minutes"
```

**Check Monorepo Structure**:
```bash
ls -d apps/* docs/ docker/
# Should show: apps/api, apps/web, docs/, docker/
```

## Quick Verification Script

Run this script to verify key requirements:

```bash
#!/bin/bash

echo "=== Verifying Requirements ==="

echo "1. Checking Nuxt 4.x..."
grep -q '"nuxt": "^4.0.0"' apps/web/package.json && echo "✅ Nuxt 4.x found" || echo "❌ Nuxt 4.x not found"

echo "2. Checking NestJS..."
grep -q "@nestjs/core" apps/api/package.json && echo "✅ NestJS found" || echo "❌ NestJS not found"

echo "3. Checking PostgreSQL..."
grep -q "postgres:16" docker/docker-compose.yml && echo "✅ PostgreSQL found" || echo "❌ PostgreSQL not found"

echo "4. Checking Server Routes..."
[ -f apps/web/server/api/permits.get.ts ] && echo "✅ GET route exists" || echo "❌ GET route missing"
[ -f apps/web/server/api/permits.post.ts ] && echo "✅ POST route exists" || echo "❌ POST route missing"

echo "5. Checking Data Model..."
grep -q "applicantName" apps/api/src/permits/entities/permit-application.entity.ts && echo "✅ applicantName field exists" || echo "❌ applicantName missing"
grep -q "@IsEmail" apps/api/src/permits/dto/create-permit-application.dto.ts && echo "✅ Email validation exists" || echo "❌ Email validation missing"
grep -q "ApplicationStatus" apps/api/src/permits/entities/permit-application.entity.ts && echo "✅ Status enum exists" || echo "❌ Status enum missing"

echo "6. Checking Pages..."
[ -f apps/web/app/pages/index.vue ] && echo "✅ Home page exists" || echo "❌ Home page missing"
[ -f apps/web/app/pages/apply.vue ] && echo "✅ Apply page exists" || echo "❌ Apply page missing"

echo "7. Checking Documentation..."
[ -f README.md ] && echo "✅ README exists" || echo "❌ README missing"
[ -f docs/PRESENTATION_NOTES.md ] && echo "✅ Presentation notes exist" || echo "❌ Presentation notes missing"

echo "=== Verification Complete ==="
```

Save as `verify.sh`, make executable (`chmod +x verify.sh`), and run: `./verify.sh`

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check database logs
docker logs permit-service-postgres

# Restart database
docker compose -f docker/docker-compose.yml restart
```

### Port Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Check what's using port 3001
lsof -i :3001

# Kill process if needed (replace PID)
kill -9 <PID>
```

### Module Not Found
```bash
# Reinstall dependencies
cd apps/api && rm -rf node_modules && npm install
cd ../web && rm -rf node_modules && npm install
```

## Expected Test Results

After completing all verification steps, you should have:

✅ PostgreSQL running in Docker  
✅ Backend API running on http://localhost:3001  
✅ Frontend running on http://localhost:3000  
✅ Home page displays permit applications  
✅ Apply page successfully creates new permits  
✅ Status badges are color-coded and visible  
✅ RTL support works (layout flips)  
✅ Responsive design works (mobile/tablet/desktop)  
✅ All API calls go through Nuxt server routes  
✅ All data model fields are present and validated  

If all checks pass, the application meets all requirements from the Task PDF.

