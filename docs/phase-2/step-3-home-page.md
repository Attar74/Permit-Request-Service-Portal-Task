# Phase 2 - Step 2.3: Home Page Listing Applications

## What Was Done

Implemented the home page (`/`) to fetch and display all permit applications. Added status visualization with color-coded badges and formatted date display.

## Why It Was Done

- **Data Display**: Users can view all permit applications in a clear table format
- **Status Visualization**: Color-coded badges make application status immediately visible
- **User Experience**: Loading states, error handling, and empty states provide feedback
- **API Integration**: Uses Nuxt Server Routes (API Gateway pattern) via `useFetch`
- **Type Safety**: Full TypeScript support with shared types

## Commands to Run

### Start Development Server

```bash
cd apps/web
npm run dev
```

### View Home Page

Navigate to `http://localhost:3000` in your browser.

### Prerequisites

Ensure backend is running:

```bash
# Terminal 1: PostgreSQL
docker compose -f docker/docker-compose.yml up -d

# Terminal 2: NestJS Backend
cd apps/api
npm run start:dev

# Terminal 3: Nuxt Frontend
cd apps/web
npm run dev
```

## Key Files/Paths Modified

### Page Component

1. **apps/web/app/pages/index.vue**
   - Fetches permit applications using `useFetch('/api/permits')`
   - Displays data in a table format
   - Shows loading state while fetching
   - Shows error message if fetch fails
   - Shows empty state if no applications exist
   - Status badges with color coding:
     - **Pending**: Yellow background, dark yellow text
     - **Approved**: Green background, dark green text
     - **Rejected**: Red background, dark red text
   - Formatted date display (e.g., "Dec 12, 2024, 02:30 PM")

## Implementation Details

### Data Fetching

Uses Nuxt's `useFetch` composable:

```typescript
const { data, pending, error } = await useFetch<PermitApplication[]>('/api/permits');
```

**Benefits**:
- Automatic SSR/SSG support
- Reactive data updates
- Built-in loading and error states
- Type-safe with TypeScript generics

### Status Visualization

Status badges use CSS classes based on status value:

- `status-pending`: Yellow styling
- `status-approved`: Green styling
- `status-rejected`: Red styling

### Date Formatting

Custom `formatDate` function formats ISO date strings:

```typescript
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
```

Example output: "Dec 12, 2024, 02:30 PM"

## UI Components

### Table Structure

- **Header**: ID, Applicant Name, Email, Permit Type, Status, Submitted At
- **Rows**: One row per permit application
- **Hover Effect**: Row background changes on hover
- **Responsive**: Table scrolls horizontally on small screens (will be improved in Phase 3)

### Status Badges

- Rounded pill-shaped badges
- Color-coded by status
- Clear visual distinction between states

### States

1. **Loading State**: "Loading applications..." message
2. **Error State**: Error message with error details
3. **Empty State**: Message with link to apply page
4. **Data State**: Table with applications

## API Integration

The page calls `/api/permits` which:
1. Routes to Nuxt Server Route (`server/api/permits.get.ts`)
2. Server route calls NestJS backend (`http://localhost:3001/permits`)
3. Backend queries PostgreSQL database
4. Response flows back through the chain

**No direct backend calls** - all requests go through Nuxt Server Routes.

## Testing

### Test Scenarios

1. **Empty State**:
   - Start with empty database
   - Visit `http://localhost:3000`
   - Should see "No permit applications found" message

2. **With Data**:
   - Create applications via `/apply` page or API
   - Visit `http://localhost:3000`
   - Should see table with applications
   - Status badges should be color-coded

3. **Loading State**:
   - Slow down backend (add delay) or check network tab
   - Should see "Loading applications..." briefly

4. **Error State**:
   - Stop backend server
   - Visit `http://localhost:3000`
   - Should see error message

## Styling

- **Table**: Clean, modern design with shadows and rounded corners
- **Typography**: Clear hierarchy with uppercase headers
- **Colors**: Status-based color coding for quick recognition
- **Spacing**: Comfortable padding and margins
- **Hover Effects**: Visual feedback on interactive elements

## Next Steps

- Step 2.4: Apply Page with form (create new applications)
- Phase 3: Design System integration and RTL support

## Commit

```bash
git add apps/web/app/pages/index.vue
git commit -m "phase(2): step(2.3) - Home Page listing applications"
```

