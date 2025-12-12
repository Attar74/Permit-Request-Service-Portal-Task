import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin(() => {
  // Apply theme immediately on client-side before page renders
  if (import.meta.client) {
    const getTheme = (): 'light' | 'dark' => {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) return saved;

      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      return prefersDark ? 'dark' : 'light';
    };

    const applyTheme = (theme: 'light' | 'dark') => {
      const html = document.documentElement;
      if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    };

    const theme = getTheme();
    applyTheme(theme);

    // Save to localStorage if not already set
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', theme);
    }
  }
});
