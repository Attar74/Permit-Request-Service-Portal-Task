# Contributing Guidelines

This document outlines the contribution guidelines for the Permit Request Service Portal project.

## Commit Message Format

All commits must follow this format:

```
phase(X): step(Y) - <short description>
```

### Examples

- `phase(0): step(0.1) - Create monorepo structure and baseline docs`
- `phase(1): step(1.3) - Implement Permit Application data model`
- `phase(2): step(2.2) - Implement Nuxt Server Routes as API Gateway`

### Format Breakdown

- **phase(X)**: The phase number (0-4)
- **step(Y)**: The step number within that phase
- **Description**: Short, descriptive summary of what was done

### Why This Format?

- **Traceability**: Easy to map commits to documentation
- **Organization**: Clear progression through phases
- **Review**: Reviewers can quickly understand project structure
- **History**: Git history becomes self-documenting

## Phase-to-Documentation Mapping

Each phase has dedicated documentation directories:

```
docs/
├── phase-0/  # Planning & Repository Setup
├── phase-1/  # Database & Backend
├── phase-2/  # Nuxt 4 Web App
├── phase-3/  # Design System + RTL + Responsiveness
└── phase-4/  # Quality, DX, and Delivery
```

### Documentation Requirements

For **every step**, you must create/update a markdown file:

```
docs/phase-X/step-Y-<slug>.md
```

### Documentation Template

Each step documentation should include:

1. **What Was Done**
   - Clear description of changes

2. **Why It Was Done**
   - Rationale and context

3. **Commands to Run**
   - Exact commands needed to execute the step

4. **Key Files/Paths Edited**
   - List of files created/modified

5. **Environment Variables Added**
   - Any new environment variables

6. **Next Steps**
   - What comes next in the workflow

## Code Quality Standards

### Formatting

- Use **Prettier** for consistent code formatting
- Run `npm run format` before committing
- All code must pass `npm run format:check`

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid `any` types (use `unknown` if necessary)

### Code Style

- Follow existing patterns in the codebase
- Write self-documenting code
- Add comments for complex logic only

## Git Workflow

### Before Committing

1. Ensure `git status` is clean (except for your changes)
2. Run `npm run format` to format code
3. Verify all tests pass (when applicable)
4. Update/create documentation for the step

### Commit Checklist

- [ ] Code is formatted
- [ ] Documentation is updated/created
- [ ] Commit message follows format: `phase(X): step(Y) - <description>`
- [ ] `git status` shows only intended changes
- [ ] Working tree is clean after commit

### After Committing

- Verify: `git status` shows "working tree clean"
- Documentation file exists in `docs/phase-X/step-Y-*.md`

## Phase Execution Rules

### Strict Order

Phases must be executed **strictly in order**:

1. Phase 0: Planning & Repository Setup
2. Phase 1: Database & Backend
3. Phase 2: Nuxt 4 Web App
4. Phase 3: Design System + RTL + Responsiveness
5. Phase 4: Quality, DX, and Delivery

### One Step = One Commit

Each numbered step must result in:
- A single, meaningful commit
- Clean git status
- Complete documentation

### No Skipping Steps

Do not skip steps or combine multiple steps into one commit unless explicitly allowed.

## Development Environment

### Prerequisites

- Node.js v20.x or later
- Docker and Docker Compose
- Git

### Setup

1. Clone the repository
2. Install dependencies: `npm install` (from root)
3. Install app-specific dependencies:
   - `cd apps/api && npm install`
   - `cd apps/web && npm install`
4. Copy `.env.example` to `.env` and configure
5. Start services: `docker compose up -d`

## Questions?

If you have questions about these guidelines, please:
1. Check existing documentation in `docs/`
2. Review similar commits in git history
3. Consult the architecture documentation

