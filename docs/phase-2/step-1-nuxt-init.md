# Phase 2 - Step 2.1: Create Nuxt 4 App Using app/ Directory

## What Was Done

Created a Nuxt 4 application in `apps/web` using the `app/` directory structure. Set up base layout, routing, and TypeScript configuration.

## Why It Was Done

- **Nuxt 4**: Latest version with improved performance and developer experience
- **app/ Directory**: Modern Nuxt structure (replaces `pages/` in Nuxt 3+)
- **TypeScript**: Full type safety across the application
- **File-based Routing**: Automatic routing based on file structure
- **Layouts**: Reusable layout components for consistent UI

## Commands to Run

### Install Dependencies

```bash
cd apps/web
npm install
```

### Start Development Server

```bash
cd apps/web
npm run dev
```

The application will be available at `http://localhost:3000` (or port specified in `NUXT_PORT` env var).

### Build for Production

```bash
cd apps/web
npm run build
```

### Preview Production Build

```bash
cd apps/web
npm run preview
```

## Key Files/Paths Created

### Application Structure

```
apps/web/
├── app/
│   ├── layouts/
│   │   └── default.vue      # Default layout with navigation
│   └── pages/
│       ├── index.vue        # Home page (/)
│       └── apply.vue         # Apply page (/apply)
├── server/
│   └── api/                 # Server routes (to be created in step 2.2)
├── types/
│   └── permit.ts            # Shared TypeScript types
├── app.vue                  # Root component
├── nuxt.config.ts          # Nuxt configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

### Configuration Files

1. **apps/web/package.json**
   - Nuxt 4 as dependency
   - Scripts: `dev`, `build`, `generate`, `preview`
   - `@nuxt/devtools` for development tools
   - `type: "module"` for ES modules

2. **apps/web/nuxt.config.ts**
   - Nuxt 4 configuration
   - `compatibilityDate`: Ensures consistent behavior
   - `devtools`: Enabled for development
   - `runtimeConfig`: Server-side configuration for API base URL
   - Reads `API_BASE_URL` from environment (default: `http://localhost:3001`)

3. **apps/web/tsconfig.json**
   - Extends Nuxt's generated TypeScript config
   - Provides type definitions for Nuxt components and APIs

### Application Files

4. **apps/web/app.vue**
   - Root component
   - Renders `<NuxtPage />` for page content

5. **apps/web/app/layouts/default.vue**
   - Default layout for all pages
   - Navigation header with links to Home and Apply
   - Basic styling with scoped CSS
   - Uses `<slot />` for page content

6. **apps/web/app/pages/index.vue**
   - Home page route (`/`)
   - Placeholder content (will be implemented in step 2.3)

7. **apps/web/app/pages/apply.vue**
   - Apply page route (`/apply`)
   - Placeholder content (will be implemented in step 2.4)

### Type Definitions

8. **apps/web/types/permit.ts**
   - Shared TypeScript types for permit applications
   - `ApplicationStatus` enum matching backend
   - `PermitApplication` interface
   - `CreatePermitApplication` interface
   - Ensures type safety between frontend and backend

## Environment Variables

The application reads configuration from `.env` file in the root directory:

- `API_BASE_URL`: Backend API base URL (default: `http://localhost:3001`)
- `NUXT_PORT`: Frontend port (default: 3000)

## Routing

Nuxt 4 uses file-based routing with the `app/pages/` directory:

- `app/pages/index.vue` → `/`
- `app/pages/apply.vue` → `/apply`

## Layouts

Layouts are defined in `app/layouts/`:

- `default.vue`: Applied to all pages by default
- Can be overridden per page using `<NuxtLayout>`

## TypeScript Support

- Full TypeScript support out of the box
- Shared types in `types/` directory
- Type-safe API calls (to be implemented in step 2.2)
- Auto-completion for Nuxt APIs

## Development Tools

- **Nuxt DevTools**: Enabled for development
  - Component inspector
  - Performance monitoring
  - Module information

## Testing the Setup

1. Start the development server:
   ```bash
   cd apps/web
   npm run dev
   ```

2. Visit `http://localhost:3000`:
   - Should see "Permit Request Service Portal" heading
   - Navigation links should work

3. Visit `http://localhost:3000/apply`:
   - Should see "Apply for a Permit" heading

## Next Steps

- Step 2.2: Implement Nuxt Server Routes as API Gateway
- Step 2.3: Home Page listing applications
- Step 2.4: Apply Page with form

## Commit

```bash
git add apps/web/
git commit -m "phase(2): step(2.1) - Create Nuxt 4 app using app/ directory"
```

