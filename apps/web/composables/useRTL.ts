export const useRTL = () => {
  const dir = ref<'ltr' | 'rtl'>('ltr');
  const locale = ref<string>('en');

  const setRTL = (rtl: boolean) => {
    dir.value = rtl ? 'rtl' : 'ltr';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir.value);
    }
  };

  const setLocale = (newLocale: string) => {
    locale.value = newLocale;
    const isRTL = newLocale.startsWith('ar') || newLocale.startsWith('he');
    setRTL(isRTL);
  };

  onMounted(() => {
    // Detect from browser locale
    const browserLocale = navigator.language || 'en';
    setLocale(browserLocale);

    // Can also be set manually or from user preferences
    // setLocale('ar'); // For Arabic
  });

  return {
    dir: readonly(dir),
    locale: readonly(locale),
    setRTL,
    setLocale,
  };
};

