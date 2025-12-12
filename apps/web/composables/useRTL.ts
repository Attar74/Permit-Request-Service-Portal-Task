export const useRTL = () => {
  const dir = ref<'ltr' | 'rtl'>('ltr');
  const locale = ref<string>('en');

  const setRTL = (rtl: boolean) => {
    dir.value = rtl ? 'rtl' : 'ltr';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir.value);
      document.documentElement.setAttribute('lang', locale.value);
    }
  };

  const setLocale = (newLocale: string) => {
    locale.value = newLocale;
    // RTL languages: Arabic, Hebrew, Persian, Urdu, etc.
    const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi'];
    const isRTL = rtlLanguages.some((lang) => newLocale.startsWith(lang));
    setRTL(isRTL);
  };

  onMounted(() => {
    // Detect from browser locale
    const browserLocale = navigator.language || 'en';
    setLocale(browserLocale);

    // Can also be set manually or from user preferences
    // Example: setLocale('ar'); // For Arabic
  });

  // Watch for locale changes
  watch(locale, (newLocale) => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi'];
    const isRTL = rtlLanguages.some((lang) => newLocale.startsWith(lang));
    setRTL(isRTL);
  });

  return {
    dir: readonly(dir),
    locale: readonly(locale),
    setRTL,
    setLocale,
    isRTL: computed(() => dir.value === 'rtl'),
  };
};

