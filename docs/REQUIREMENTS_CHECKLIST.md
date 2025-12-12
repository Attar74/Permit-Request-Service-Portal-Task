# Requirements Checklist - Permit Request Service Portal

This document audits the repository against the Task PDF requirements. Each requirement is checked with evidence and verification steps.

## A) Tech Stack

### A.1 Nuxt 4.x Used
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/package.json` line 18: `"nuxt": "^4.0.0"`
- **Verification**: 
  ```bash
  cd apps/web && cat package.json | grep nuxt
  ```
  Should show: `"nuxt": "^4.0.0"`

### A.2 Backend is NestJS OR Strapi
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/api/package.json` shows NestJS dependencies:
    - `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
    - `@nestjs/typeorm`, `@nestjs/config`
  - `apps/api/src/main.ts` exists (NestJS entry point)
  - `apps/api/src/app.module.ts` exists (NestJS module structure)
- **Verification**: 
  ```bash
  cd apps/api && cat package.json | grep @nestjs
  ```
  Should show multiple `@nestjs/*` packages

### A.3 PostgreSQL Used
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `docker/docker-compose.yml` line 5: `image: postgres:16-alpine`
  - `apps/api/src/app.module.ts` configures TypeORM with PostgreSQL
  - `.env.example` contains PostgreSQL connection variables
- **Verification**: 
  ```bash
  cat docker/docker-compose.yml | grep postgres
  ```
  Should show: `image: postgres:16-alpine`

### A.4 Saudi National Design System Guidelines Used
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `README.md` line 225: "follows the **Saudi National Design System (SDGA)** guidelines"
  - `docs/phase-3/step-1-design-system.md` documents design system integration
  - Components use Tailwind CSS with design system patterns
  - `apps/web/tailwind.config.js` contains design system configuration
- **Verification**: 
  ```bash
  grep -r "Saudi National Design System" README.md docs/
  ```
  Should show multiple references

---

## B) Data Model (Permit Application)

### B.1 applicant_name (required)
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/api/src/permits/entities/permit-application.entity.ts` line 19: `applicantName: string`
  - `apps/api/src/permits/dto/create-permit-application.dto.ts` line 4-6: `@IsNotEmpty()` validation
- **Verification**: 
  ```bash
  grep -A 2 "applicantName" apps/api/src/permits/entities/permit-application.entity.ts
  ```

### B.2 applicant_email (required, email)
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/api/src/permits/entities/permit-application.entity.ts` line 22: `applicantEmail: string`
  - `apps/api/src/permits/dto/create-permit-application.dto.ts` line 8-9: `@IsNotEmpty()` and `@IsEmail()` validation
- **Verification**: 
  ```bash
  grep -A 2 "applicantEmail" apps/api/src/permits/dto/create-permit-application.dto.ts
  ```
  Should show `@IsEmail()` decorator

### B.3 permit_type (required)
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/api/src/permits/entities/permit-application.entity.ts` line 25: `permitType: string`
  - `apps/api/src/permits/dto/create-permit-application.dto.ts` line 12-13: `@IsNotEmpty()` validation
- **Verification**: 
  ```bash
  grep -A 2 "permitType" apps/api/src/permits/dto/create-permit-application.dto.ts
  ```

### B.4 application_status enum: Pending/Approved/Rejected, default Pending
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/api/src/permits/entities/permit-application.entity.ts` lines 8-12: `ApplicationStatus` enum with `PENDING`, `APPROVED`, `REJECTED`
  - Line 32: `default: ApplicationStatus.PENDING`
- **Verification**: 
  ```bash
  grep -A 5 "ApplicationStatus" apps/api/src/permits/entities/permit-application.entity.ts
  ```

### B.5 submitted_at auto timestamp
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/api/src/permits/entities/permit-application.entity.ts` line 36: `@CreateDateColumn({ name: 'submitted_at', type: 'timestamp' })`
- **Verification**: 
  ```bash
  grep "submitted_at" apps/api/src/permits/entities/permit-application.entity.ts
  ```
  Should show `@CreateDateColumn`

---

## C) Functional Requirements (Nuxt Frontend)

### C.1 Home page / lists all permits
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/app/pages/index.vue` exists and uses `PermitApplicationsList` component
  - `apps/web/app/pages/index.vue` line 29: `await useFetch<PermitApplication[]>('/api/permits')`
  - `apps/web/components/PermitApplicationsList.vue` displays applications in list/grid view
- **Verification**: 
  ```bash
  # Start dev server and visit http://localhost:3000
  # Should see list of permit applications
  ```

### C.2 Apply page /apply submits new permit
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/app/pages/apply.vue` exists with form
  - `apps/web/app/pages/apply.vue` line 306: `await $fetch('/api/permits', { method: 'POST' })`
  - Form has fields: applicantName, applicantEmail, permitType
- **Verification**: 
  ```bash
  # Start dev server and visit http://localhost:3000/apply
  # Fill form and submit - should redirect to home page
  ```

### C.3 Status is visually distinguished on Home page
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/components/PermitApplicationsList.vue` lines 195-208: Status badges with color coding
  - `getBadgeClasses()` function returns different colors for pending/approved/rejected
  - Badges use icons and colored backgrounds
- **Verification**: 
  ```bash
  # View home page - status badges should have different colors:
  # Pending: yellow, Approved: green, Rejected: red
  ```

---

## D) Architectural Requirements

### D.1 All frontend calls proxied via Nuxt Server Routes
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/server/api/permits.get.ts` exists (GET endpoint)
  - `apps/web/server/api/permits.post.ts` exists (POST endpoint)
  - `apps/web/app/pages/index.vue` line 29: calls `/api/permits` (not direct backend)
  - `apps/web/app/pages/apply.vue` line 306: calls `/api/permits` (not direct backend)
- **Verification**: 
  ```bash
  # Check that no frontend code calls http://localhost:3001 directly
  grep -r "localhost:3001" apps/web/app/ apps/web/components/
  ```
  Should return no results (or only in server routes)

### D.2 Server routes exist and communicate with backend
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/server/api/permits.get.ts` line 9: `fetch(\`${apiBaseUrl}/permits\`)`
  - `apps/web/server/api/permits.post.ts` line 23: `fetch(\`${apiBaseUrl}/permits\`, { method: 'POST' })`
  - Both routes use `useRuntimeConfig()` to get `apiBaseUrl`
- **Verification**: 
  ```bash
  cat apps/web/server/api/permits.get.ts | grep fetch
  cat apps/web/server/api/permits.post.ts | grep fetch
  ```
  Should show fetch calls to backend API

---

## E) UI/UX Requirements

### E.1 RTL support demonstrated
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/composables/useRTL.ts` exists with RTL detection and management
  - `apps/web/app/layouts/default.vue` line 2: `:dir="dir"` attribute
  - `docs/phase-3/step-2-rtl.md` documents RTL implementation
  - Components use RTL-aware classes
- **Verification**: 
  ```bash
  # In browser console: document.documentElement.setAttribute('dir', 'rtl')
  # Layout should flip to right-to-left
  ```

### E.2 Responsive layout demonstrated
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `apps/web/components/PermitApplicationsList.vue` has grid/list views with responsive breakpoints
  - `apps/web/app/pages/apply.vue` uses responsive classes (`sm:`, `md:`, `lg:`)
  - `docs/phase-3/step-3-responsive.md` documents responsive design
  - Mobile-first approach with Tailwind breakpoints
- **Verification**: 
  ```bash
  # Open DevTools, toggle device toolbar
  # Test at 375px (mobile), 768px (tablet), 1280px (desktop)
  # Layout should adapt appropriately
  ```

### E.3 UI uses Saudi Design System style (components, spacing, accessibility)
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `README.md` line 225: "follows the **Saudi National Design System (SDGA)** guidelines"
  - `apps/web/tailwind.config.js` contains design system configuration
  - Components use consistent spacing, colors, and typography
  - Accessibility: focus states, ARIA labels, semantic HTML
- **Verification**: 
  ```bash
  # Check components for:
  # - Consistent spacing (Tailwind classes)
  # - Focus states on interactive elements
  # - ARIA labels on buttons
  ```

---

## F) Deliverables

### F.1 Single git repo includes all components
- **Status**: ✅ **PASS**
- **Evidence**: 
  - Monorepo structure with `apps/web`, `apps/api`, `docs/`, `docker/`
  - All code in single repository
- **Verification**: 
  ```bash
  ls -la
  ```
  Should show: `apps/`, `docs/`, `docker/`, `README.md`

### F.2 Root README has setup steps for entire stack
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `README.md` exists with comprehensive setup instructions
  - Lines 43-149: "Quick Start" section with 7 steps
  - Includes: clone, env setup, PostgreSQL, dependencies, seed, backend, frontend
- **Verification**: 
  ```bash
  grep -A 5 "Quick Start" README.md
  ```
  Should show setup steps

### F.3 Presentation notes exist (5–10 min explanation)
- **Status**: ✅ **PASS**
- **Evidence**: 
  - `docs/PRESENTATION_NOTES.md` exists
  - Line 4: "**Duration**: 5-10 minutes"
  - Contains sections: Overview, Architecture, Data Flow, Design System, Highlights
- **Verification**: 
  ```bash
  head -10 docs/PRESENTATION_NOTES.md
  ```
  Should show "Duration: 5-10 minutes"

---

## Summary

**Total Requirements**: 18  
**Passed**: 18 ✅  
**Failed**: 0 ❌

All requirements from the Task PDF are satisfied. The repository is complete and ready for review.

---

## How to Verify All Requirements

See `docs/VERIFICATION_STEPS.md` for detailed verification commands.

