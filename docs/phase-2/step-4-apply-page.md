# Phase 2 - Step 2.4: Apply Page with Form

## What Was Done

Implemented the apply page (`/apply`) with a form to create new permit applications. Added client-side validation, error handling, and success redirect.

## Why It Was Done

- **User Input**: Allows users to submit permit applications through the UI
- **Validation**: Client-side validation provides immediate feedback
- **Error Handling**: Clear error messages for validation and API errors
- **User Experience**: Loading states, disabled inputs during submission, success redirect
- **API Integration**: Uses Nuxt Server Routes (API Gateway pattern) via `$fetch`

## Commands to Run

### Start Development Server

```bash
cd apps/web
npm run dev
```

### View Apply Page

Navigate to `http://localhost:3000/apply` in your browser.

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

1. **apps/web/app/pages/apply.vue**
   - Form with three required fields:
     - Applicant Name (text input)
     - Email Address (email input)
     - Permit Type (text input)
   - Client-side validation:
     - Required field validation
     - Email format validation
   - Form submission using `$fetch('/api/permits', { method: 'POST' })`
   - Error display for validation and API errors
   - Loading state during submission
   - Success redirect to home page (`/`)

## Implementation Details

### Form State Management

Uses Vue 3 Composition API with `reactive`:

```typescript
const form = reactive<CreatePermitApplication>({
  applicantName: '',
  applicantEmail: '',
  permitType: '',
});
```

### Validation

Client-side validation function:

```typescript
function validateForm(): boolean {
  // Validates required fields
  // Validates email format using regex
  // Returns true if valid, false otherwise
  // Sets error messages in errors object
}
```

**Validation Rules**:
- **Applicant Name**: Required, must not be empty
- **Email**: Required, must match email regex pattern
- **Permit Type**: Required, must not be empty

### Form Submission

Uses Nuxt's `$fetch` for API calls:

```typescript
await $fetch('/api/permits', {
  method: 'POST',
  body: form,
});
```

**Flow**:
1. Validate form client-side
2. If valid, submit to `/api/permits`
3. On success: redirect to home page
4. On error: display error message

### Error Handling

- **Validation Errors**: Displayed inline below each field
- **API Errors**: Displayed in error banner above form
- **Network Errors**: Generic error message with retry suggestion

## Form Fields

### Applicant Name

- **Type**: Text input
- **Required**: Yes
- **Validation**: Must not be empty
- **Placeholder**: "Enter your full name"

### Email Address

- **Type**: Email input
- **Required**: Yes
- **Validation**: 
  - Must not be empty
  - Must match email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Placeholder**: "Enter your email address"

### Permit Type

- **Type**: Text input
- **Required**: Yes
- **Validation**: Must not be empty
- **Placeholder**: "e.g., Construction Permit, Business License"

## UI Components

### Form Layout

- **Container**: Centered, max-width 600px
- **Card Style**: White background with shadow and rounded corners
- **Spacing**: Comfortable padding and margins

### Input Fields

- **Styling**: Clean borders, focus states with blue highlight
- **Disabled State**: Gray background when submitting
- **Error State**: Red error message below field

### Submit Button

- **Primary Action**: Blue background, white text
- **Loading State**: Shows "Submitting..." text
- **Disabled**: Gray when submitting or invalid

### Cancel Link

- **Secondary Action**: Gray text, link to home page
- **Hover**: Underline on hover

## User Flow

1. **User visits `/apply`**
   - Sees empty form

2. **User fills form**
   - Types in each field
   - Real-time validation on blur/submit

3. **User submits form**
   - Client-side validation runs
   - If invalid: errors displayed
   - If valid: form submits to API

4. **During submission**
   - Button shows "Submitting..."
   - Inputs are disabled
   - User cannot modify form

5. **On success**
   - Redirects to home page (`/`)
   - New application appears in list

6. **On error**
   - Error message displayed
   - Form remains editable
   - User can retry

## API Integration

The form submits to `/api/permits` which:
1. Routes to Nuxt Server Route (`server/api/permits.post.ts`)
2. Server route validates and calls NestJS backend
3. Backend validates with DTOs and creates record
4. Response flows back through the chain

**No direct backend calls** - all requests go through Nuxt Server Routes.

## Testing

### Test Scenarios

1. **Valid Submission**:
   - Fill all fields with valid data
   - Submit form
   - Should redirect to home page
   - New application should appear in list

2. **Empty Fields**:
   - Leave fields empty
   - Submit form
   - Should see validation errors
   - Form should not submit

3. **Invalid Email**:
   - Enter invalid email (e.g., "invalid-email")
   - Submit form
   - Should see email validation error

4. **API Error**:
   - Stop backend server
   - Fill and submit form
   - Should see API error message
   - Form should remain editable

5. **Network Error**:
   - Disconnect network
   - Submit form
   - Should see network error message

## Styling

- **Form**: Clean, modern design with card layout
- **Inputs**: Clear borders, focus states, disabled states
- **Errors**: Red text for validation errors
- **Button**: Primary blue, disabled gray
- **Spacing**: Comfortable padding and margins

## Accessibility

- **Labels**: All inputs have associated labels
- **Required Fields**: Marked with asterisk (*)
- **Error Messages**: Associated with form fields
- **Keyboard Navigation**: Tab order follows form flow
- **Disabled State**: Clear visual indication

## Next Steps

- Phase 3: Design System integration and RTL support
- Phase 3 Step 3.1: Integrate Saudi National Design System
- Phase 3 Step 3.2: RTL support
- Phase 3 Step 3.3: Responsive layout

## Commit

```bash
git add apps/web/app/pages/apply.vue
git commit -m "phase(2): step(2.4) - Apply Page with form"
```

