<template>
  <div :dir="dir" class="min-h-screen bg-background">
    <header class="border-b">
      <nav
        class="container mx-auto flex items-center justify-between px-4 py-4"
      >
        <NuxtLink to="/" class="text-xl font-bold text-foreground">
          Permit Request Portal
        </NuxtLink>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ t('Home') }}
          </NuxtLink>
          <NuxtLink
            to="/apply"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ t('Apply') }}
          </NuxtLink>
          
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            type="button"
          >
            <span v-if="isDark" class="text-lg">☀️</span>
            <span v-else class="text-lg">🌙</span>
          </button>
          
          <!-- Language Toggle -->
          <button
            @click="toggleLocale"
            class="h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors"
            type="button"
          >
            {{ locale === 'en' ? 'العربية' : 'English' }}
          </button>
        </div>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRTL } from '../../composables/useRTL';
import { useTheme } from '../../composables/useTheme';

const { dir, locale, toggleLocale } = useRTL();
const { theme, toggleTheme, isDark } = useTheme();

// Simple translation function
const translations = {
  en: {
    Home: 'Home',
    Apply: 'Apply',
  },
  ar: {
    Home: 'الرئيسية',
    Apply: 'تقديم طلب',
  },
};

const t = (key: string) => {
  return translations[locale.value][key as keyof typeof translations.en] || key;
};
</script>
