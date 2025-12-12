# Phase 3 - Step 3.2: RTL Support

## What Was Done

Enhanced RTL (Right-to-Left) support throughout the application. Implemented automatic RTL detection based on locale, document direction management, and RTL-specific styling adjustments.

## Why It Was Done

- **Arabic Support**: Required for Saudi National Design System compliance
- **Accessibility**: Proper RTL support improves accessibility for Arabic speakers
- **User Experience**: Native RTL experience for Arabic users
- **Design System**: Aligns with Saudi National Design System (SDGA) requirements
- **Internationalization**: Foundation for multi-language support

## Commands to Run

### Test RTL Support

1. Start development server:
   ```bash
   cd apps/web
   npm run dev
   ```

2. Test RTL manually:
   - Open browser console
   - Run: `document.documentElement.setAttribute('dir', 'rtl')`
   - Verify layout flips correctly

3. Test with Arabic locale:
   - Modify `useRTL.ts` to set locale to 'ar'
   - Or use browser language settings

## Key Files/Paths Created/Modified

### Composables

1. **apps/web/composables/useRTL.ts**
   - RTL detection and management composable
   - Automatic locale detection from browser
   - Support for RTL languages: Arabic (ar), Hebrew (he), Persian (fa), Urdu (ur), Yiddish (yi)
   - Document direction management
   - Language attribute management
   - Reactive RTL state

### CSS Enhancements

2. **apps/web/assets/css/main.css**
   - RTL-specific font family (Arabic fonts)
   - Text alignment adjustments for RTL
   - Logical property adjustments
   - Margin/padding corrections for RTL

### Component Updates

3. **apps/web/app.vue**
   - Root component with RTL direction attribute
   - Layout wrapper integration

4. **apps/web/app/layouts/default.vue**
   - Uses RTL composable
   - Responsive to direction changes

## RTL Implementation Details

### Automatic Detection

The `useRTL` composable automatically detects RTL based on:

1. **Browser Locale**: Detects from `navigator.language`
2. **Language Codes**: Supports RTL languages:
   - Arabic: `ar`, `ar-SA`, `ar-EG`, etc.
   - Hebrew: `he`, `he-IL`
   - Persian: `fa`, `fa-IR`
   - Urdu: `ur`, `ur-PK`
   - Yiddish: `yi`

### Manual Override

You can manually set RTL:

```typescript
const { setLocale, setRTL } = useRTL();

// Set Arabic locale (automatically enables RTL)
setLocale('ar');

// Or directly set RTL
setRTL(true);
```

### Document Direction

The composable automatically sets:
- `dir` attribute on `<html>` element
- `lang` attribute for proper language declaration
- Updates when locale changes

## RTL-Specific Styling

### Font Family

- **LTR**: Uses `--font-sans` (Inter, Segoe UI, Tahoma)
- **RTL**: Uses `--font-arabic` (Cairo, Tajawal)

### Text Alignment

- Tailwind's `text-left` becomes `text-right` in RTL
- Tailwind's `text-right` becomes `text-left` in RTL
- Logical properties handle margins/padding automatically

### Component Adjustments

All shadcn-vue components are RTL-aware:
- Buttons: Icon positioning adjusts
- Forms: Label and input alignment
- Tables: Column alignment
- Navigation: Menu positioning

## Testing RTL

### Manual Testing

1. **Browser Console**:
   ```javascript
   document.documentElement.setAttribute('dir', 'rtl');
   ```

2. **Locale Change**:
   ```typescript
   // In component
   const { setLocale } = useRTL();
   setLocale('ar');
   ```

3. **Visual Verification**:
   - Navigation should flip to right side
   - Text should align right
   - Icons should flip positions
   - Forms should align right

### Test Cases

1. **Home Page**:
   - Table columns should align right in RTL
   - Status badges should position correctly
   - Navigation should be on right

2. **Apply Page**:
   - Form labels should align right
   - Input fields should align right
   - Buttons should position correctly

3. **Layout**:
   - Header navigation should flip
   - Content should flow right-to-left
   - Spacing should adjust correctly

## Arabic Font Support

### Font Stack

```css
--font-arabic: 'Cairo', 'Tajawal', 'Arial', sans-serif;
```

### Recommended Fonts

- **Cairo**: Modern Arabic font, good for UI
- **Tajawal**: Clean, readable Arabic font
- **Arial**: Fallback with Arabic support

### Font Loading

To load Arabic fonts, add to `app.vue` or layout:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
```

## Future Enhancements

- **i18n Integration**: Full internationalization with vue-i18n
- **Language Switcher**: UI component to switch languages
- **Persistent Preference**: Save user's language preference
- **Content Translation**: Translate UI text to Arabic
- **Date/Time Formatting**: RTL-aware date formatting

## Environment Variables

No new environment variables added in this step.

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile Browsers**: Full support

## Next Steps

- Step 3.3: Responsive layout (mobile-first optimizations)
- Phase 4: Quality, DX, and Delivery

## References

- [MDN: RTL Support](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [Saudi National Design System](https://www.figma.com/@sdga)
- [W3C: Structural markup and right-to-left text](https://www.w3.org/International/questions/qa-html-dir)

## Commit

```bash
git add apps/web/composables/useRTL.ts apps/web/assets/css/main.css
git commit -m "phase(3): step(3.2) - RTL support"
```

