# Permit Request Service Portal

A full-stack application for managing permit requests, built with Nuxt 4, NestJS, and PostgreSQL. This application follows the Saudi National Design System (SDGA) guidelines with full RTL support and responsive design.

## 🏗️ Architecture

This project follows a monorepo structure with clear separation of concerns:

- **apps/web**: Nuxt 4 frontend application with shadcn-vue components
- **apps/api**: NestJS backend API with TypeORM
- **docs/**: Comprehensive documentation for each phase
- **docker/**: Docker configuration for PostgreSQL

### System Flow

```
┌─────────────┐
│   Browser   │
│  (Nuxt UI)  │
└──────┬──────┘
       │
       │ HTTP Request to /api/permits
       ▼
┌─────────────────────┐
│  Nuxt Server Routes │
│   (API Gateway)     │
└──────┬──────────────┘
       │
       │ Internal Server-Side Fetch
       ▼
┌─────────────────────┐
│   NestJS Backend    │
│   REST API          │
└──────┬──────────────┘
       │
       │ TypeORM
       ▼
┌─────────────────────┐
│    PostgreSQL       │
└─────────────────────┘
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or later) - [Download](https://nodejs.org/)
- **Docker** and **Docker Compose** - [Download](https://www.docker.com/get-started)
- **npm** (v10.x or later) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:Attar74/Permit-Request-Service-Portal-Task.git
cd Permit-Request-Service-Portal-Task
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=permit_service

# Backend API Configuration
API_PORT=3001
API_BASE_URL=http://localhost:3001

# Frontend Configuration (Nuxt)
NUXT_PORT=3000
```

### 3. Start PostgreSQL

Start the PostgreSQL database using Docker Compose:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Verify PostgreSQL is running:

```bash
docker ps | grep postgres
```

### 4. Install Dependencies

Install dependencies for both applications:

```bash
# Root dependencies (Prettier)
npm install

# Backend dependencies
cd apps/api
npm install

# Frontend dependencies
cd ../web
npm install
```

### 5. Seed Database (Optional)

Populate the database with sample data:

```bash
cd apps/api
npm run seed
```

This creates 5 sample permit applications for testing.

### 6. Start Backend

In a terminal, start the NestJS backend:

```bash
cd apps/api
npm run start:dev
```

The API will be available at `http://localhost:3001`

### 7. Start Frontend

In another terminal, start the Nuxt frontend:

```bash
cd apps/web
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing the Application

### 1. View Applications

Visit `http://localhost:3000` in your browser. You should see:
- A list of permit applications (if seeded)
- Status badges (Pending, Approved, Rejected)
- Application details in a table (desktop) or cards (mobile)

### 2. Create Application

1. Click "Apply" in the navigation
2. Fill out the form:
   - Applicant Name (required)
   - Email Address (required, must be valid email)
   - Permit Type (required)
3. Click "Submit Application"
4. You'll be redirected to the home page
5. Your new application should appear in the list

### 3. Test API Directly

```bash
# Get all applications
curl http://localhost:3001/permits

# Create new application
curl -X POST http://localhost:3001/permits \
  -H "Content-Type: application/json" \
  -d '{
    "applicantName": "Test User",
    "applicantEmail": "test@example.com",
    "permitType": "Test Permit"
  }'
```

## 📁 Project Structure

```
.
├── apps/
│   ├── api/                 # NestJS Backend
│   │   ├── src/
│   │   │   ├── permits/     # Permit module
│   │   │   │   ├── dto/     # Data Transfer Objects
│   │   │   │   ├── entities/# Database entities
│   │   │   │   └── *.ts     # Controller, Service, Module
│   │   │   └── main.ts      # Application entry point
│   │   └── package.json
│   └── web/                 # Nuxt 4 Frontend
│       ├── app/
│       │   ├── layouts/     # Layout components
│       │   └── pages/       # Page components
│       ├── components/
│       │   └── ui/          # shadcn-vue components
│       ├── server/
│       │   └── api/         # Nuxt Server Routes (API Gateway)
│       ├── types/           # TypeScript types
│       └── package.json
├── docs/                    # Documentation
│   ├── phase-0/             # Planning & setup
│   ├── phase-1/             # Database & backend
│   ├── phase-2/             # Nuxt web app
│   ├── phase-3/             # Design system & RTL
│   └── phase-4/             # Quality & delivery
├── docker/
│   └── docker-compose.yml   # PostgreSQL configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🎨 Design System

This application follows the **Saudi National Design System (SDGA)** guidelines:

- **Components**: shadcn-vue component library
- **Styling**: Tailwind CSS with custom design tokens
- **RTL Support**: Full right-to-left support for Arabic
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG AA compliant

### Key Features

- ✅ Modern UI with shadcn-vue components
- ✅ RTL (Right-to-Left) support for Arabic
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Type-safe API with TypeScript
- ✅ API Gateway pattern (Nuxt Server Routes)
- ✅ Form validation (client & server)
- ✅ Status visualization with color-coded badges

## 🔧 Development

### Available Scripts

#### Root

```bash
npm run format          # Format all code with Prettier
npm run format:check    # Check code formatting
```

#### Backend (apps/api)

```bash
npm run start:dev      # Start development server with hot reload
npm run build          # Build for production
npm run start:prod     # Start production server
npm run seed           # Seed database with sample data
npm run test           # Run tests
npm run lint           # Lint code
```

#### Frontend (apps/web)

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run generate       # Generate static site
```

### Code Formatting

The project uses Prettier for consistent code formatting:

```bash
# Format all code
npm run format

# Check formatting
npm run format:check
```

## 🐳 Docker

### PostgreSQL

Start PostgreSQL:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Stop PostgreSQL:

```bash
docker compose -f docker/docker-compose.yml down
```

Reset database (removes all data):

```bash
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
```

### Database Access

Connect to PostgreSQL:

```bash
docker exec -it permit-service-postgres psql -U postgres -d permit_service
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **Phase 0**: Planning & Repository Setup
- **Phase 1**: Database & Backend
- **Phase 2**: Nuxt 4 Web App
- **Phase 3**: Design System + RTL + Responsiveness
- **Phase 4**: Quality, DX, and Delivery

Each phase has detailed step-by-step documentation explaining what was done, why it was done, and how to use it.

## 🔄 API Gateway Pattern

All frontend API calls go through Nuxt Server Routes, which act as an API Gateway. This ensures:

- **Security**: Backend URLs are never exposed to the client
- **Centralized Management**: Single point for API request/response transformation
- **Error Handling**: Consistent error handling and formatting
- **Flexibility**: Easy to switch backend implementations

### Example Flow

1. Frontend calls `/api/permits` (Nuxt Server Route)
2. Server Route calls `http://localhost:3001/permits` (NestJS Backend)
3. Backend queries PostgreSQL database
4. Response flows back through the chain

## 🌐 RTL Support

The application supports Right-to-Left (RTL) languages:

- **Automatic Detection**: Detects RTL from browser locale
- **Arabic Support**: Full Arabic font support (Cairo, Tajawal)
- **Manual Override**: Can be set manually via `useRTL()` composable

To test RTL:

```javascript
// In browser console
document.documentElement.setAttribute('dir', 'rtl');
```

## 📱 Responsive Design

The application is fully responsive:

- **Mobile** (< 640px): Card-based layouts, stacked forms
- **Tablet** (640px - 1024px): Optimized table views
- **Desktop** (> 1024px): Full table with all columns

## 🧪 Testing

### Manual Testing

1. **Home Page**: View applications list
2. **Apply Page**: Submit new application
3. **Status Badges**: Verify color coding
4. **Responsive**: Test on different screen sizes
5. **RTL**: Test with Arabic locale

### API Testing

```bash
# Get all applications
curl http://localhost:3001/permits

# Create application
curl -X POST http://localhost:3001/permits \
  -H "Content-Type: application/json" \
  -d '{"applicantName":"Test","applicantEmail":"test@example.com","permitType":"Test"}'
```

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: `docker ps | grep postgres`
- Check environment variables in `.env`
- Verify database credentials

### Port Already in Use

- Change `API_PORT` or `NUXT_PORT` in `.env`
- Or stop the process using the port

### Module Not Found

- Run `npm install` in the respective app directory
- Clear `node_modules` and reinstall if needed

### TypeScript Errors

- Ensure all dependencies are installed
- Run `npm run build` to check for errors

## 📝 Commit Convention

This project follows a structured commit format:

```
phase(X): step(Y) - <short description>
```

Examples:
- `phase(0): step(0.1) - Create monorepo structure and baseline docs`
- `phase(1): step(1.4) - Implement Backend API endpoints`

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details.

## 🏛️ Technology Stack

- **Frontend**: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, shadcn-vue
- **Backend**: NestJS, TypeScript, TypeORM
- **Database**: PostgreSQL 16
- **Design System**: Saudi National Design System (SDGA)
- **Containerization**: Docker, Docker Compose

## 📄 License

[To be determined]

## 👥 Contributors

- Initial implementation following task requirements

## 🙏 Acknowledgments

- [Saudi National Design System (SDGA)](https://www.figma.com/@sdga)
- [shadcn/ui](https://ui.shadcn.com/)
- [Nuxt](https://nuxt.com/)
- [NestJS](https://nestjs.com/)

---

For detailed implementation documentation, see the `docs/` directory.
