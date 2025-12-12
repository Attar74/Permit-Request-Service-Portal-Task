# Phase 3 - Step 3.1: Integrate Saudi National Design System with Tailwind CSS

## What Was Done

Integrated Tailwind CSS with explicit utility classes, configured design system based on Saudi National Design System (SDGA) guidelines, and implemented all UI components using native HTML elements styled with Tailwind CSS.

## Why It Was Done

- **Pure Tailwind CSS**: Direct utility classes for maximum control and clarity
- **Design System Alignment**: Matches Saudi National Design System (SDGA) from Figma
- **Consistency**: Unified design language across the application
- **Accessibility**: WCAG AA compliant components
- **Maintainability**: Explicit classes are easier to understand and modify
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
   - Added `@nuxt/icon` module for icon support
   - Added CSS import: `~/assets/css/main.css`

2. **apps/web/tailwind.config.js**
   - Configured Tailwind CSS with explicit utility classes
   - Content paths for component scanning
   - Safelist for commonly used classes

3. **apps/web/assets/css/main.css**
   - Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
   - RTL support base styles
   - Light and dark theme support
   - Font smoothing and selection styles

### Components Created

4. **apps/web/components/AppHeader.vue**
   - Header component with logo, theme toggle, and language switcher
   - Mobile drawer toggle button
   - Full-width sticky header
   - Dark mode support

5. **apps/web/components/AppDrawer.vue**
   - Sidebar drawer navigation component
   - Toggleable width (icon-only when closed, icon+text when open)
   - Responsive behavior (hidden on mobile, visible on desktop)
   - RTL-aware positioning and animations
   - Navigation buttons with active state

6. **apps/web/components/PermitApplicationsList.vue**
   - List and grid view toggle
   - Status badges with color coding
   - Responsive table and card layouts
   - Localized text using `useTranslations`
   - Persistent view mode preference

### Composables

7. **apps/web/composables/useRTL.ts**
   - RTL detection and management
   - Locale switching (English/Arabic)
   - Document direction management
   - SSR-safe state management

8. **apps/web/composables/useTheme.ts**
   - Dark mode toggle
   - Theme persistence in localStorage
   - System preference detection
   - SSR-safe state management

9. **apps/web/composables/useTranslations.ts**
   - Centralized translation system
   - English and Arabic translations
   - Type-safe translation keys
   - Locale-aware translations

### Updated Pages

10. **apps/web/app/layouts/default.vue**
    - Integrated AppHeader and AppDrawer
    - Dynamic margin adjustment for drawer
    - RTL-aware layout
    - Dark mode support

11. **apps/web/app/pages/index.vue**
    - Uses PermitApplicationsList component
    - Localized page title and description
    - Dark mode support

12. **apps/web/app/pages/apply.vue**
    - Native HTML form elements styled with Tailwind
    - Client-side validation
    - Error display with localized messages
    - Dark mode support
    - Responsive layout

## Design System Implementation

### Colors

Using explicit Tailwind color utilities:

- **Primary**: `bg-teal-700`, `text-teal-700` (Saudi Green)
- **Background**: `bg-white`, `bg-gray-50` (light), `bg-gray-900`, `bg-gray-800` (dark)
- **Text**: `text-gray-900`, `text-gray-600` (light), `text-gray-100`, `text-gray-400` (dark)
- **Borders**: `border-gray-200`, `border-gray-300` (light), `border-gray-700` (dark)
- **Status Colors**:
  - Pending: `bg-yellow-500/10`, `text-yellow-700`, `border-yellow-500/30`
  - Approved: `bg-green-500/10`, `text-green-700`, `border-green-500/30`
  - Rejected: `bg-red-500/10`, `text-red-700`, `border-red-500/30`

### Typography

- **Fonts**: System fonts (Inter, Segoe UI for LTR; Cairo, Tajawal for RTL)
- **Sizes**: Responsive text sizes (`text-sm`, `text-base`, `text-lg`, `text-xl`, etc.)
- **Weights**: `font-medium`, `font-semibold`, `font-bold`

### Spacing

- Consistent spacing scale using Tailwind defaults
- Responsive padding and margins
- Container-based layouts

### Border Radius

- Consistent rounded corners: `rounded-[0.875rem]`, `rounded-[1rem]`
- Button radius: `rounded-[0.875rem]`
- Card radius: `rounded-[1rem]`

### Shadows

- Subtle shadows: `shadow-sm`, `shadow-md`, `shadow-lg`
- Hover elevation: `hover:shadow-lg`
- Active state: `active:shadow-sm`

## Component Examples

### Button

```vue
<button
  class="bg-black dark:bg-black/20 text-white dark:text-white hover:bg-black/80 dark:hover:bg-black/20 rounded-[0.875rem] shadow-md hover:shadow-lg"
>
  Submit
</button>
```

### Input

```vue
<input
  type="text"
  class="w-full h-11 px-4 py-2.5 rounded-[0.875rem] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
/>
```

### Card

```vue
<div
  class="bg-white dark:bg-gray-800 rounded-[1rem] border border-gray-200 dark:border-gray-700 shadow-md p-6"
>
  <!-- Card content -->
</div>
```

## Features

### Dark Mode

- Automatic system preference detection
- Manual toggle via theme switcher
- Persistent preference in localStorage
- Smooth transitions between themes

### Localization

- English and Arabic support
- Centralized translation system
- Locale-aware date formatting
- RTL-aware layout adjustments

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Adaptive layouts for all screen sizes
- Touch-friendly interactive elements

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus States**: Clear focus indicators with `focus-visible:ring-2 focus-visible:ring-blue-500`
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
   - `http://localhost:3000` - Home page with applications list
   - `http://localhost:3000/apply` - Apply form

3. Verify:
   - Components render correctly
   - Colors match design system
   - Dark mode works
   - RTL layout works
   - Localization works
   - Spacing is consistent
   - Typography is readable

### Feature Testing

- Toggle dark mode
- Switch language (English/Arabic)
- Toggle drawer open/closed
- Test responsive layouts
- Test form validation
- Test navigation

## Next Steps

- Step 3.2: RTL support (enhance with Arabic locale)
- Step 3.3: Responsive layout (mobile-first optimizations)

## References

- [Saudi National Design System (SDGA)](https://www.figma.com/@sdga)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Nuxt Icon Documentation](https://nuxt.com/modules/icon)

## Commit

```bash
git add apps/web/
git commit -m "phase(3): step(3.1) - Integrate Saudi National Design System with Tailwind CSS"
```
