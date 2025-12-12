export const useTheme = () => {
  // Initialize from localStorage
  const getInitialTheme = (): 'light' | 'dark' => {
    if (process.client) {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) return saved;
    }
    // Default to dark theme
    return 'dark';
  };

  const theme = useState<'light' | 'dark'>('theme', () => getInitialTheme());

  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (process.client) {
      const html = document.documentElement;
      if (newTheme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme;
    if (process.client) {
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Apply theme on client-side
  if (process.client) {
    // Apply immediately
    applyTheme(theme.value);

    // Watch for changes and sync
    watch(theme, (newTheme) => {
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // Sync on mount
    onMounted(() => {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved && saved !== theme.value) {
        theme.value = saved;
        applyTheme(saved);
      } else {
        applyTheme(theme.value);
      }
    });
  }

  return {
    theme: readonly(theme),
    setTheme,
    toggleTheme,
    isDark: computed(() => theme.value === 'dark'),
  };
};
