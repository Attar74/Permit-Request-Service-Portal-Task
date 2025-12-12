# Architecture Overview

## System Architecture

This document explains the overall architecture of the Permit Request Service Portal.

## High-Level Flow

```
┌─────────────┐
│   Browser   │
│  (Nuxt UI)  │
└──────┬──────┘
       │
       │ HTTP Request
       ▼
┌─────────────────────┐
│  Nuxt Server Routes │
│   (API Gateway)     │
│  /api/permits.*     │
└──────┬──────────────┘
       │
       │ Internal Server-Side Fetch
       ▼
┌─────────────────────┐
│   NestJS Backend    │
│   REST API          │
│   /permits          │
└──────┬──────────────┘
       │
       │ TypeORM / Prisma
       ▼
┌─────────────────────┐
│    PostgreSQL       │
│    Database         │
└─────────────────────┘
```

## Why API Gateway Pattern?

The Nuxt Server Routes act as an **API Gateway** between the frontend and backend. This pattern provides several benefits:

### 1. **Security**

- Backend API URLs are never exposed to the client
- Sensitive configuration (API keys, internal URLs) stays on the server
- Prevents direct client access to backend endpoints

### 2. **Centralized API Management**

- Single point of entry for all API calls
- Consistent error handling and response formatting
- Request/response transformation in one place

### 3. **Flexibility**

- Easy to switch backend implementations without frontend changes
- Can add caching, rate limiting, or authentication at the gateway level
- Enables API versioning strategies

### 4. **Development Experience**

- Frontend developers work with a consistent API interface
- Backend can evolve independently
- Easier to mock or stub during development

## Technology Stack

### Frontend: Nuxt 4

- **Framework**: Nuxt 4 (latest) with `app/` directory structure
- **Design System**: Saudi National Design System (Platforms Code)
- **Styling**: Tailwind CSS with explicit utility classes
- **Icons**: @nuxt/icon with Lucide icon set
- **Features**: RTL support, dark mode, localization, responsive design, SSR/SSG

### Backend: NestJS

- **Framework**: NestJS (TypeScript)
- **Database ORM**: TypeORM or Prisma (to be determined)
- **Validation**: class-validator, class-transformer
- **API Style**: RESTful

### Database: PostgreSQL

- **Version**: Latest stable
- **Connection**: Via Docker Compose for local development
- **Migrations**: Managed by TypeORM/Prisma

## Data Flow Example

### Creating a Permit Application

1. **User Action**: User fills form on `/apply` page
2. **Frontend**: Form submission triggers `useFetch('/api/permits', { method: 'POST', body: formData })`
3. **Nuxt Server Route**: `apps/web/server/api/permits.post.ts` receives request
4. **Internal Call**: Server route makes `fetch(API_BASE_URL + '/permits', { method: 'POST', body: formData })`
5. **Backend**: NestJS controller validates DTO, service creates record
6. **Database**: TypeORM/Prisma inserts into `permit_applications` table
7. **Response**: Backend → Server Route → Frontend → User sees success/error

### Listing Permit Applications

1. **User Action**: User visits `/` (home page)
2. **Frontend**: `useAsyncData('/api/permits')` fetches list
3. **Nuxt Server Route**: `apps/web/server/api/permits.get.ts` receives request
4. **Internal Call**: Server route fetches from backend `/permits`
5. **Backend**: NestJS service queries database, returns array
6. **Response**: Backend → Server Route → Frontend → UI renders list

## Directory Structure

```
.
├── apps/
│   ├── web/              # Nuxt 4 frontend
│   │   ├── app/          # Nuxt app directory
│   │   ├── server/       # Nuxt server routes (API Gateway)
│   │   │   └── api/      # /api/* endpoints
│   │   └── types/        # Shared TypeScript types
│   └── api/              # NestJS backend
│       ├── src/
│       │   ├── permits/  # Permit module
│       │   │   ├── dto/  # Data Transfer Objects
│       │   │   ├── entities/ # Database entities
│       │   │   └── permits.controller.ts
│       │   └── main.ts
│       └── package.json
├── docs/                 # Documentation
│   ├── phase-0/         # Planning & setup
│   ├── phase-1/         # Database & backend
│   ├── phase-2/         # Nuxt web app
│   ├── phase-3/         # Design system & RTL
│   └── phase-4/         # Quality & delivery
├── docker/              # Docker configurations
│   └── docker-compose.yml
└── README.md
```

## Environment Variables

### Frontend (Nuxt)

- `API_BASE_URL`: Backend API base URL (e.g., `http://localhost:3001`)

### Backend (NestJS)

- `DATABASE_HOST`: PostgreSQL host
- `DATABASE_PORT`: PostgreSQL port
- `DATABASE_USER`: Database user
- `DATABASE_PASSWORD`: Database password
- `DATABASE_NAME`: Database name

## Security Considerations

- All backend API calls are server-side only
- No direct database connections from frontend
- Environment variables are server-side only
- Input validation at both frontend (UX) and backend (security) levels
