# Phase 3.3 - Align Card and Layout Components with Design Tokens

## What Was Done

Aligned all card and layout components to use design system tokens consistently, ensuring proper use of `bg-card`, `text-card-foreground`, `border-border`, and consistent border radius and shadow depth.

## Token Usage Verification

### ✅ Card Components

**Design Tokens Used:**
- `bg-card` → `hsl(var(--card))` (White in light, dark gray in dark)
- `text-card-foreground` → `hsl(var(--card-foreground))` (Dark in light, light in dark)
- `border-border` → `hsl(var(--border))` (Design system border color)
- `bg-popover` → `hsl(var(--popover))` (For dropdowns)

### Border Radius Consistency

- **Changed**: `rounded-lg` → `rounded-md`
- **Reason**: Aligns with design system `--radius` (0.5rem)
- **Impact**: Consistent with inputs, buttons, and overall design system

### Shadow Depth Hierarchy

**Updated Shadow Levels:**
- **Default Cards**: `shadow-sm` (subtle elevation)
- **Hover Cards**: `shadow-md` (was `shadow-lg`, more appropriate)
- **Form Card**: `shadow-md` (was `shadow-lg`, matches other cards)
- **Dropdown**: `shadow-lg` (appropriate for elevated elements)

### Border Consistency

- **Added**: Explicit `border-border` token
- **Impact**: Ensures all cards use design system border color
- **Before**: Generic `border` class
- **After**: `border border-border` (explicit token usage)

## Components Updated

### 1. Form Card (apply.vue)
- **Before**: `rounded-lg border-2 border-border shadow-lg`
- **After**: `rounded-md border border-border shadow-md`
- **Impact**: More subtle, consistent with other cards

### 2. Loading State Card
- **Before**: `rounded-lg border shadow-sm`
- **After**: `rounded-md border border-border shadow-sm`
- **Impact**: Consistent border token usage

### 3. Error State Card
- **Before**: `rounded-lg border shadow-sm`
- **After**: `rounded-md border border-border shadow-sm`
- **Impact**: Consistent styling

### 4. Empty State Card
- **Before**: `rounded-lg border shadow-sm`
- **After**: `rounded-md border border-border shadow-sm`
- **Impact**: Consistent styling

### 5. List View Card
- **Before**: `rounded-lg border shadow-sm`
- **After**: `rounded-md border border-border shadow-sm`
- **Impact**: Consistent styling

### 6. Grid View Cards
- **Before**: `rounded-lg border shadow-sm hover:shadow-lg`
- **After**: `rounded-md border border-border shadow-sm hover:shadow-md`
- **Impact**: More subtle hover elevation, consistent radius

### 7. Language Dropdown
- **Before**: `rounded-lg`
- **After**: `rounded-md`
- **Impact**: Consistent with other components

## Visual Hierarchy

### Card Elevation Levels
1. **Default**: `shadow-sm` - Subtle elevation
2. **Hover**: `shadow-md` - Moderate elevation increase
3. **Form Card**: `shadow-md` - Slightly elevated for importance
4. **Dropdown**: `shadow-lg` - Elevated above page content

## Spacing Consistency

All cards maintain consistent:
- ✅ Padding rhythm
- ✅ Border width (1px via `border`)
- ✅ Border radius (`rounded-md`)
- ✅ Shadow depth appropriate to context

## Design System Alignment

All card components now:
- ✅ Use design system color tokens
- ✅ Use consistent border radius
- ✅ Use appropriate shadow depth
- ✅ Maintain proper contrast in light/dark modes
- ✅ Support RTL layouts

## Accessibility

- ✅ Card backgrounds have proper contrast with text
- ✅ Borders provide clear visual separation
- ✅ Shadows help establish visual hierarchy
- ✅ All tokens adapt to dark mode

## RTL Compatibility

All card classes are RTL-compatible:
- ✅ No hardcoded directional classes
- ✅ Borders work in both directions
- ✅ Shadows work in both directions
- ✅ Padding works in both directions

## Next Steps

- ✅ Phase 3.3 complete: Card and layout components aligned
- ➡️ Proceed to Phase 4: Form spacing and UX polish

## Related Files

- `apps/web/app/pages/apply.vue` - Form card updated
- `apps/web/components/PermitApplicationsList.vue` - All card states updated
- `apps/web/components/AppHeader.vue` - Dropdown card updated

