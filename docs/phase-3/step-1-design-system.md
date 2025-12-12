# Phase 3 - Step 3.1: Integrate Saudi National Design System with shadcn/ui

## What Was Done

Integrated shadcn-vue (Vue port of shadcn/ui) component library with Tailwind CSS, configured design tokens based on Saudi National Design System (SDGA) guidelines, and updated all pages to use the new component system.

## Why It Was Done

- **shadcn/ui**: High-quality, accessible, customizable component library
- **Design System Alignment**: Matches Saudi National Design System (SDGA) from Figma
- **Consistency**: Unified design language across the application
- **Accessibility**: Built-in accessibility features
- **Customization**: Easy to customize with Tailwind CSS
- **Type Safety**: Full TypeScript support

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

## Key Files/Paths Created/Modified

### Configuration Files

1. **apps/web/nuxt.config.ts**
   - Added `@nuxtjs/tailwindcss` module
   - Added `@vueuse/nuxt` module
   - Added CSS import: `~/assets/css/main.css`

2. **apps/web/tailwind.config.js**
   - Configured Tailwind CSS with Saudi Design System colors
   - Extended theme with custom colors, fonts, and border radius
   - Content paths for component scanning

3. **apps/web/assets/css/main.css**
   - Tailwind directives
   - CSS variables for design tokens (colors, spacing, fonts)
   - Saudi National Design System color palette
   - RTL support base styles
   - Light and dark theme support

4. **apps/web/lib/utils.ts**
   - `cn()` utility function for merging Tailwind classes
   - Uses `clsx` and `tailwind-merge`

### shadcn-vue Components Created

5. **apps/web/components/ui/button.vue**
   - Button component with variants (default, destructive, outline, secondary, ghost, link)
   - Size variants (default, sm, lg, icon)
   - Full accessibility support

6. **apps/web/components/ui/card.vue**
   - Card container component
   - CardHeader, CardTitle, CardContent sub-components

7. **apps/web/components/ui/input.vue**
   - Input component with focus states
   - Disabled states
   - Placeholder styling

8. **apps/web/components/ui/label.vue**
   - Label component for form fields
   - Accessibility support

9. **apps/web/components/ui/badge.vue**
   - Badge component with variants
   - Status-specific variants (pending, approved, rejected)
   - Color-coded status badges

10. **apps/web/components/ui/table.vue**
    - Table components (Table, TableHeader, TableBody, TableRow, TableHead, TableCell)
    - Responsive table wrapper
    - Hover states

### Updated Pages

11. **apps/web/app/layouts/default.vue**
    - Updated to use Tailwind CSS classes
    - Responsive navigation
    - Container-based layout
    - RTL support integration

12. **apps/web/app/pages/index.vue**
    - Migrated to shadcn-vue components
    - Uses Card, Table, Badge components
    - Improved loading and error states
    - Better visual hierarchy

13. **apps/web/app/pages/apply.vue**
    - Migrated to shadcn-vue components
    - Uses Card, Input, Label, Button components
    - Improved form layout and spacing
    - Better error display

### RTL Support

14. **apps/web/composables/useRTL.ts**
    - RTL detection composable
    - Locale-based RTL switching
    - Document direction management

15. **apps/web/app.vue**
    - Root component with RTL support
    - Layout wrapper

## Design System Tokens

### Colors (Saudi National Design System)

Based on SDGA guidelines and shadcn/ui color system:

- **Primary**: Saudi Green/Blue (`221.2 83.2% 53.3%`)
- **Secondary**: Neutral grays
- **Destructive**: Red for errors
- **Muted**: Subtle backgrounds
- **Accent**: Interactive elements
- **Status Colors**:
  - Pending: Yellow
  - Approved: Green
  - Rejected: Red

### Typography

- **Sans Font**: Inter, Segoe UI, Tahoma (LTR)
- **Arabic Font**: Cairo, Tajawal (RTL)
- Font feature settings for better rendering

### Spacing & Layout

- Consistent spacing scale
- Container-based layouts
- Responsive breakpoints

## Component Usage Examples

### Button

```vue
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
```

### Card

```vue
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Badge

```vue
<Badge variant="pending">Pending</Badge>
<Badge variant="approved">Approved</Badge>
<Badge variant="rejected">Rejected</Badge>
```

### Input & Label

```vue
<div class="space-y-2">
  <Label for="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
</div>
```

## Responsive Design

All components are responsive by default:

- **Mobile**: Full-width, stacked layouts
- **Tablet**: Adjusted spacing and layout
- **Desktop**: Optimal use of space

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus States**: Clear focus indicators
- **ARIA Labels**: Proper labeling for screen readers
- **Color Contrast**: WCAG AA compliant colors
- **Semantic HTML**: Proper HTML structure

## Environment Variables

No new environment variables added in this step.

## Testing

### Visual Testing

1. Start development server:
   ```bash
   cd apps/web
   npm run dev
   ```

2. Visit pages:
   - `http://localhost:3000` - Home page with table
   - `http://localhost:3000/apply` - Apply form

3. Verify:
   - Components render correctly
   - Colors match design system
   - Spacing is consistent
   - Typography is readable

### Component Testing

Test each component variant:
- Button: All variants and sizes
- Badge: All status variants
- Input: Focus, disabled, error states
- Card: Different content layouts

## Next Steps

- Step 3.2: RTL support (enhance with Arabic locale)
- Step 3.3: Responsive layout (mobile-first optimizations)

## References

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Saudi National Design System (SDGA)](https://www.figma.com/@sdga)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## Commit

```bash
git add apps/web/
git commit -m "phase(3): step(3.1) - Integrate Saudi National Design System with shadcn/ui"
```

