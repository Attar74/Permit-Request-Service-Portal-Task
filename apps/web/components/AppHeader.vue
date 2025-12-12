<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-gray-900/95 shadow-sm"
  >
    <nav
      class="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo/Brand -->
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 text-gray-900 dark:text-gray-100 transition-all hover:opacity-90 active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 transition-colors group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40"
          >
            <Icon name="lucide:file-check-2" class="h-6 w-6" />
          </div>
          <div class="flex flex-col">
            <span
              class="hidden sm:inline-block text-lg font-bold leading-tight text-gray-900 dark:text-gray-100"
            >
              Permit Request Portal
            </span>
            <span class="sm:hidden text-base font-bold text-gray-900 dark:text-gray-100"
              >Portal</span
            >
            <span
              class="hidden sm:inline-block text-xs font-normal text-gray-500 dark:text-gray-400 leading-tight mt-0.5"
            >
              خدمة طلبات التصاريح
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center gap-2">
        <button
          @click="navigateTo('/')"
          type="button"
          :class="[
            'h-10 px-4 rounded-[1rem] border border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md hover:shadow-xl active:scale-95 text-sm font-medium',
            route.path === '/'
              ? 'bg-black dark:bg-white text-white dark:text-black font-semibold'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300',
          ]"
        >
          <Icon name="lucide:home" class="h-4 w-4" />
          {{ t('Home') }}
        </button>
        <button
          @click="navigateTo('/apply')"
          type="button"
          :class="[
            'h-10 px-4 rounded-[1rem] border border-gray-300 flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md hover:shadow-xl active:scale-95 text-sm font-medium',
            route.path === '/apply'
              ? 'bg-black text-white font-semibold'
              : 'bg-white text-gray-700',
          ]"
        >
          <Icon name="lucide:file-plus" class="h-4 w-4" />
          {{ t('Apply') }}
        </button>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-3">
        <!-- Mobile Menu Button -->
        <button
          v-if="!isMobileMenuOpen"
          @click="isMobileMenuOpen = true"
          class="md:hidden h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm"
          type="button"
          :aria-label="t('Open menu')"
        >
          <Icon name="lucide:menu" class="h-5 w-5" />
        </button>
        <button
          v-else
          @click="isMobileMenuOpen = false"
          class="md:hidden h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm"
          type="button"
          :aria-label="t('Close menu')"
        >
          <Icon name="lucide:x" class="h-5 w-5" />
        </button>

        <!-- Divider (Desktop) -->
        <div class="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden md:block"></div>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
            class="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
            :aria-label="t('Switch language')"
            :aria-expanded="isLanguageMenuOpen"
          >
            <span class="text-lg leading-none">{{
              locale === 'en' ? '🇬🇧' : '🇸🇦'
            }}</span>
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
              class="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-hidden backdrop-blur-sm"
            >
              <div class="py-1.5">
                <button
                  @click="setLocale('en')"
                  class="w-full px-4 py-3 text-sm font-medium text-left transition-colors flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                  :class="
                    locale === 'en'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                      : 'text-gray-900 dark:text-gray-100'
                  "
                  type="button"
                >
                  <span class="text-xl leading-none">🇬🇧</span>
                  <div class="flex flex-col flex-1">
                    <span class="font-semibold text-sm">English</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">الإنجليزية</span>
                  </div>
                  <Icon
                    v-if="locale === 'en'"
                    name="lucide:check"
                    class="h-4 w-4 ml-auto text-teal-700 dark:text-teal-400 flex-shrink-0"
                  />
                </button>
                <div class="h-px border my-1"></div>
                <button
                  @click="setLocale('ar')"
                  class="w-full px-4 py-3 text-sm font-medium text-left transition-colors flex items-center gap-3 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                  :class="
                    locale === 'ar'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-900'
                  "
                  type="button"
                >
                  <span class="text-xl leading-none">🇸🇦</span>
                  <div class="flex flex-col flex-1">
                    <span class="font-semibold text-sm">العربية</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Arabic</span>
                  </div>
                  <Icon
                    v-if="locale === 'ar'"
                    name="lucide:check"
                    class="h-4 w-4 ml-auto text-teal-700 dark:text-teal-400 flex-shrink-0"
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
        class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl"
      >
        <div class="container mx-auto px-4 py-4 space-y-2">
          <button
            @click="handleNavigation('/')"
            type="button"
            :class="[
              'h-10 px-4 rounded-[1rem] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md hover:shadow-xl active:scale-95 text-sm font-medium w-full',
              route.path === '/'
                ? 'bg-black dark:bg-white text-white dark:text-black font-semibold border-b-4 border-white dark:border-black'
                : '',
            ]"
          >
            <Icon name="lucide:home" class="h-4 w-4" />
            {{ t('Home') }}
          </button>
          <button
            @click="handleNavigation('/apply')"
            type="button"
            :class="[
              'h-10 px-4 rounded-[1rem] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md hover:shadow-xl active:scale-95 text-sm font-medium w-full',
              route.path === '/apply'
                ? 'bg-black dark:bg-white text-white dark:text-black font-semibold border-b-4 border-white dark:border-black'
                : '',
            ]"
          >
            <Icon name="lucide:file-plus" class="h-4 w-4" />
            {{ t('Apply') }}
          </button>
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
const route = useRoute();

const isMobileMenuOpen = ref<boolean>(false);
const isLanguageMenuOpen = ref<boolean>(false);
const languageMenuRef = ref<HTMLElement | null>(null);
const languageButtonRef = ref<HTMLElement | null>(null);

const setLocale = (newLocale: 'en' | 'ar') => {
  setRTLocale(newLocale);
  isLanguageMenuOpen.value = false;
};

const handleNavigation = (path: string) => {
  isMobileMenuOpen.value = false;
  navigateTo(path);
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
watch(route, () => {
  isMobileMenuOpen.value = false;
  isLanguageMenuOpen.value = false;
});
</script>
