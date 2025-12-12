# Phase 1 - Remove Tailwind Design Tokens

## What Was Done

Completely removed all Tailwind design token dependencies from components and replaced them with explicit utility classes.

## Changes Made

### Color Replacements

- `bg-background` → `bg-white` or `bg-gray-50`
- `bg-card` → `bg-white`
- `bg-primary` → `bg-teal-700`
- `bg-muted` → `bg-gray-100` or `bg-gray-50`
- `bg-accent` → `bg-gray-100`
- `bg-popover` → `bg-white`
- `text-foreground` → `text-gray-900`
- `text-muted-foreground` → `text-gray-600`
- `text-card-foreground` → `text-gray-900`
- `text-primary-foreground` → `text-white`
- `text-accent-foreground` → `text-gray-900`
- `text-primary` → `text-teal-700`
- `text-destructive` → `text-red-600`

### Border Replacements

- `border-input` → `border-gray-300`
- `border-border` → `border-gray-200` or `border-gray-300`
- `border-destructive` → `border-red-500` or `border-red-200`

### Ring Replacements

- `ring-ring` → `ring-blue-500`
- `ring-offset-background` → `ring-offset-white`

### Border Radius Replacements

- `rounded-xl` → `rounded-[1rem]`
- `rounded-lg` → `rounded-[0.875rem]`
- `rounded-md` → `rounded-[0.875rem]`

## Components Refactored

1. **AppHeader.vue**
   - Header background, navigation buttons, theme toggle, language menu
   - All token-based classes replaced with explicit utilities

2. **PermitApplicationsList.vue**
   - Cards, tables, buttons, loading/error states
   - All token-based classes replaced with explicit utilities

3. **apply.vue (Form Page)**
   - Input fields, labels, buttons, error messages
   - All token-based classes replaced with explicit utilities

4. **default.vue (Layout)**
   - Background color replaced

5. **index.vue**
   - Text colors replaced

## Result

- Zero dependency on Tailwind theme variables
- All styles use explicit, readable utility classes
- Visual consistency maintained
- No breaking changes to component APIs or logic

