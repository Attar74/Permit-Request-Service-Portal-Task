# Phase 0 - Step 0.2: Add Tooling (Lint/Format) + Commit Rules

## What Was Done

Added consistent code formatting tooling (Prettier) and established commit message rules and contributing guidelines.

## Why It Was Done

### Code Formatting (Prettier)

- **Consistency**: Ensures all code follows the same style across the entire monorepo
- **Developer Experience**: Automatic formatting reduces time spent on style discussions
- **Quality**: Consistent formatting improves code readability
- **Team Collaboration**: Standardized style makes code reviews easier

### Commit Rules

- **Traceability**: Commit messages map directly to documentation
- **Organization**: Clear structure helps track project progress
- **Review**: Reviewers can quickly understand what changed and why
- **History**: Git history becomes self-documenting

## Commands to Run

### Install Dependencies

From the root directory:

```bash
npm install
```

This installs Prettier as a dev dependency.

### Format Code

Format all code in the repository:

```bash
npm run format
```

### Check Formatting

Verify code is properly formatted (useful for CI/CD):

```bash
npm run format:check
```

## Key Files/Paths Created

### Root Configuration Files

1. **.prettierrc**
   - Prettier configuration
   - Settings: single quotes, semicolons, 80 char width, 2 space indentation

2. **.prettierignore**
   - Files/directories to exclude from formatting
   - Includes: node_modules, dist, build, .output, .nuxt, coverage, logs, .env files

3. **.editorconfig**
   - Editor configuration for consistent file encoding, line endings, indentation
   - Applies to all file types
   - Special rules for Markdown (preserve trailing whitespace)

4. **package.json** (root)
   - Workspace configuration for monorepo
   - Scripts for formatting and development
   - Prettier as dev dependency
   - Node.js engine requirements

### Documentation Files

5. **docs/CONTRIBUTING.md**
   - Commit message format: `phase(X): step(Y) - <description>`
   - Phase-to-documentation mapping
   - Documentation requirements for each step
   - Code quality standards
   - Git workflow guidelines
   - Development environment setup

6. **docs/phase-0/step-0.2-tooling-commit-rules.md** (this file)
   - Documentation of this step

## Environment Variables

None added in this step.

## Configuration Details

### Prettier Settings

- **semi**: true (use semicolons)
- **trailingComma**: "es5" (trailing commas where valid in ES5)
- **singleQuote**: true (use single quotes)
- **printWidth**: 80 (max line length)
- **tabWidth**: 2 (2 spaces for indentation)
- **useTabs**: false (use spaces, not tabs)
- **arrowParens**: "always" (always include parens in arrow functions)
- **endOfLine**: "lf" (Unix line endings)

### EditorConfig Settings

- **charset**: utf-8
- **end_of_line**: lf (Unix line endings)
- **insert_final_newline**: true
- **trim_trailing_whitespace**: true (except for Markdown)
- **indent_style**: space
- **indent_size**: 2

## Commit Message Format

All commits must follow:

```
phase(X): step(Y) - <short description>
```

### Examples

- `phase(0): step(0.2) - Add tooling and commit rules`
- `phase(1): step(1.1) - Provision PostgreSQL for local dev`
- `phase(2): step(2.3) - Implement home page with application list`

## Next Steps

- Phase 1: Database & Backend setup
  - Step 1.1: Provision PostgreSQL
  - Step 1.2: Backend bootstrapping (NestJS)
  - Step 1.3: Implement Permit Application data model
  - Step 1.4: Implement Backend API endpoints

## Commit

```bash
git add .
git commit -m "phase(0): step(0.2) - Add tooling and commit rules"
```
