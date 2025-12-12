export const useRTL = () => {
  // Default to 'ltr' for SSR compatibility
  const dir = useState<'ltr' | 'rtl'>('rtl-dir', () => 'ltr');
  const locale = useState<'en' | 'ar'>('rtl-locale', () => 'en');

  const setRTL = (rtl: boolean) => {
    dir.value = rtl ? 'rtl' : 'ltr';
    if (process.client) {
      document.documentElement.setAttribute('dir', dir.value);
      document.documentElement.setAttribute('lang', locale.value);
    }
  };

  const setLocale = (newLocale: 'en' | 'ar') => {
    locale.value = newLocale;
    const isRTL = newLocale === 'ar';
    setRTL(isRTL);
    if (process.client) {
      localStorage.setItem('locale', newLocale);
    }
  };

  const toggleLocale = () => {
    setLocale(locale.value === 'en' ? 'ar' : 'en');
  };

  if (process.client) {
    onMounted(() => {
      // Check localStorage for saved locale
      const savedLocale = localStorage.getItem('locale') as 'en' | 'ar' | null;
      if (savedLocale) {
        setLocale(savedLocale);
      } else {
        // Detect from browser locale
        const browserLocale = navigator.language || 'en';
        const isRTL = browserLocale.startsWith('ar');
        setLocale(isRTL ? 'ar' : 'en');
      }
    });

    // Watch for locale changes
    watch(locale, (newLocale) => {
      const isRTL = newLocale === 'ar';
      setRTL(isRTL);
    });
  }

  return {
    dir: readonly(dir),
    locale: readonly(locale),
    setRTL,
    setLocale,
    toggleLocale,
    isRTL: computed(() => dir.value === 'rtl'),
  };
};
