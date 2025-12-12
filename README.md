# Permit Request Service Portal

A full-stack application for managing permit requests, built with Nuxt 4, NestJS, and PostgreSQL.

## 🏗️ Architecture

This project follows a monorepo structure with clear separation of concerns:

- **apps/web**: Nuxt 4 frontend application
- **apps/api**: NestJS backend API
- **docs/**: Comprehensive documentation for each phase
- **docker/**: Docker configuration files

## 📋 Prerequisites

- Node.js (v20.x or later)
- Docker and Docker Compose
- PostgreSQL (via Docker Compose)
- npm or yarn

## 🚀 Quick Start

> **Note**: Detailed setup instructions will be added in Phase 4. For now, see individual phase documentation.

### Environment Setup

1. Copy `.env.example` to `.env` and configure variables
2. Start PostgreSQL: `docker compose up -d`
3. Start backend: `cd apps/api && npm run start:dev`
4. Start frontend: `cd apps/web && npm run dev`

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [Phase Documentation](./docs/)

## 🏛️ Design System

This application follows the **Saudi National Design System (Platforms Code)** guidelines with:
- RTL (Right-to-Left) support for Arabic
- Responsive mobile-first design
- Accessible components

## 🔄 API Gateway Pattern

All frontend API calls go through Nuxt Server Routes, which act as an API Gateway. This ensures:
- Centralized API management
- Security (backend URLs not exposed to client)
- Request/response transformation
- Error handling

## 📝 License

[To be determined]

