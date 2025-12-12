<template>
  <header
    class="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-md"
  >
    <nav
      class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo/Brand -->
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 text-xl font-bold text-foreground transition-all hover:opacity-80 active:scale-95 group"
        >
          <div class="flex flex-col">
            <span
              class="hidden sm:inline-block text-base font-bold leading-tight"
            >
              Permit Request Portal
            </span>
            <span class="sm:hidden text-base font-bold">Portal</span>
            <span
              class="hidden sm:inline-block text-xs font-normal text-muted-foreground leading-tight"
            >
              خدمة طلبات التصاريح
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center gap-1">
        <NuxtLink
          to="/"
          class="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent rounded-md group"
          active-class="!text-primary !bg-primary/10 font-semibold"
        >
          <span class="relative z-10">{{ t('Home') }}</span>
          <span
            class="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
          ></span>
        </NuxtLink>
        <NuxtLink
          to="/apply"
          class="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent rounded-md group"
          active-class="!text-primary !bg-primary/10 font-semibold"
        >
          <span class="relative z-10">{{ t('Apply') }}</span>
          <span
            class="absolute inset-0 rounded-md bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
          ></span>
        </NuxtLink>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-2">
        <!-- Mobile Menu Button -->
        <button
          v-if="!isMobileMenuOpen"
          @click="isMobileMenuOpen = true"
          class="md:hidden h-9 w-9 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          type="button"
          :aria-label="t('Open menu')"
        >
          <Icon name="lucide:menu" class="h-5 w-5" />
        </button>
        <button
          v-else
          @click="isMobileMenuOpen = false"
          class="md:hidden h-9 w-9 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          type="button"
          :aria-label="t('Close menu')"
        >
          <Icon name="lucide:x" class="h-5 w-5" />
        </button>

        <!-- Divider (Desktop) -->
        <div class="h-6 w-px bg-border mx-1 hidden md:block"></div>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="h-9 w-9 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          :title="isDark ? t('Switch to light mode') : t('Switch to dark mode')"
          type="button"
          :aria-label="
            isDark ? t('Switch to light mode') : t('Switch to dark mode')
          "
        >
          <Icon
            v-if="isDark"
            name="lucide:sun"
            class="h-5 w-5 transition-transform hover:rotate-180 duration-500"
          />
          <Icon
            v-else
            name="lucide:moon"
            class="h-5 w-5 transition-transform hover:-rotate-12 duration-300"
          />
        </button>

        <!-- Language Toggle Menu -->
        <div class="relative">
          <button
            ref="languageButtonRef"
            @click="isLanguageMenuOpen = !isLanguageMenuOpen"
            class="h-9 px-3 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-sm hover:shadow-md"
            type="button"
            :aria-label="t('Switch language')"
            :aria-expanded="isLanguageMenuOpen"
          >
            <span v-if="locale === 'en'">🇬🇧</span>
            <span v-else>🇸🇦</span>
            <Icon
              name="lucide:chevron-down"
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': isLanguageMenuOpen }"
            />
          </button>

          <!-- Language Dropdown Menu -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95 -translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-2"
          >
            <div
              v-if="isLanguageMenuOpen"
              ref="languageMenuRef"
              class="absolute right-0 mt-2 w-48 rounded-md border border-border bg-popover shadow-lg z-50 overflow-hidden"
            >
              <div class="py-1">
                <button
                  @click="setLocale('en')"
                  class="w-full px-4 py-2.5 text-sm font-medium text-left transition-colors flex items-center gap-3 hover:bg-accent hover:text-accent-foreground"
                  :class="
                    locale === 'en'
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground'
                  "
                  type="button"
                >
                  <span class="text-lg">🇬🇧</span>
                  <div class="flex flex-col">
                    <span class="font-semibold">English</span>
                    <span class="text-xs text-muted-foreground"
                      >الإنجليزية</span
                    >
                  </div>
                  <Icon
                    v-if="locale === 'en'"
                    name="lucide:check"
                    class="h-4 w-4 ml-auto text-primary"
                  />
                </button>
                <button
                  @click="setLocale('ar')"
                  class="w-full px-4 py-2.5 text-sm font-medium text-left transition-colors flex items-center gap-3 hover:bg-accent hover:text-accent-foreground"
                  :class="
                    locale === 'ar'
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground'
                  "
                  type="button"
                >
                  <span class="text-lg">🇸🇦</span>
                  <div class="flex flex-col">
                    <span class="font-semibold">العربية</span>
                    <span class="text-xs text-muted-foreground">Arabic</span>
                  </div>
                  <Icon
                    v-if="locale === 'ar'"
                    name="lucide:check"
                    class="h-4 w-4 ml-auto text-primary"
                  />
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md"
      >
        <div class="container mx-auto px-4 py-4 space-y-2">
          <NuxtLink
            to="/"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent rounded-md"
            active-class="!text-primary !bg-primary/10 font-semibold"
          >
            {{ t('Home') }}
          </NuxtLink>
          <NuxtLink
            to="/apply"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent rounded-md"
            active-class="!text-primary !bg-primary/10 font-semibold"
          >
            {{ t('Apply') }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRTL } from '../composables/useRTL';
import { useTheme } from '../composables/useTheme';

const { dir, locale, toggleLocale, setLocale: setRTLocale } = useRTL();
const { theme, toggleTheme, isDark } = useTheme();

const isMobileMenuOpen = ref<boolean>(false);
const isLanguageMenuOpen = ref<boolean>(false);
const languageMenuRef = ref<HTMLElement | null>(null);
const languageButtonRef = ref<HTMLElement | null>(null);

const setLocale = (newLocale: 'en' | 'ar') => {
  setRTLocale(newLocale);
  isLanguageMenuOpen.value = false;
};

// Close language menu when clicking outside
onClickOutside(languageMenuRef, (event) => {
  // Don't close if clicking the button itself
  if (
    languageButtonRef.value &&
    languageButtonRef.value.contains(event.target as Node)
  ) {
    return;
  }
  isLanguageMenuOpen.value = false;
});

// Simple translation function
const translations = {
  en: {
    Home: 'Home',
    Apply: 'Apply',
    'Switch to light mode': 'Switch to light mode',
    'Switch to dark mode': 'Switch to dark mode',
    'Switch language': 'Switch language',
    'Open menu': 'Open menu',
    'Close menu': 'Close menu',
  },
  ar: {
    Home: 'الرئيسية',
    Apply: 'تقديم طلب',
    'Switch to light mode': 'التبديل إلى الوضع الفاتح',
    'Switch to dark mode': 'التبديل إلى الوضع الداكن',
    'Switch language': 'تبديل اللغة',
    'Open menu': 'فتح القائمة',
    'Close menu': 'إغلاق القائمة',
  },
};

const t = (key: string) => {
  return translations[locale.value][key as keyof typeof translations.en] || key;
};

// Close mobile menu and language menu when route changes
const route = useRoute();
watch(route, () => {
  isMobileMenuOpen.value = false;
  isLanguageMenuOpen.value = false;
});
</script>
