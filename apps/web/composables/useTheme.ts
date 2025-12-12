export const useTheme = () => {
  const theme = useState<'light' | 'dark'>('theme', () => 'light');

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme;
    if (process.client) {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light');
  };

  if (process.client) {
    onMounted(() => {
      // Check localStorage for saved theme
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
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

