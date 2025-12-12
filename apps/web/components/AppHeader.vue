<template>
  <header
    class="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 backdrop-blur-xl supports-[backdrop-filter]:bg-white/95 shadow-md"
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
            <Icon
              name="lucide:file-check-2"
              class="h-6 w-6 dark:text-gray-100"
            />
          </div>
          <div class="flex flex-col">
            <span
              class="hidden sm:inline-block text-lg font-bold leading-tight text-gray-900 dark:text-gray-100"
            >
              {{ t('Permit Request Portal') }}
            </span>
            <span
              class="sm:hidden text-base font-bold text-gray-900 dark:text-gray-100"
              >{{ t('Portal') }}</span
            >
            <span
              class="hidden sm:inline-block text-xs font-normal text-gray-500 dark:text-gray-400 leading-tight mt-0.5"
            >
              {{
                locale === 'ar'
                  ? 'خدمة طلبات التصاريح'
                  : 'Permit Request Service'
              }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-3">
        <!-- Mobile Drawer Toggle -->
        <button
          @click="toggleMobileDrawer"
          class="md:hidden h-10 w-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm rounded-full"
          type="button"
          :aria-label="t('Open menu')"
        >
          <Icon name="lucide:menu" class="h-5 w-5 dark:text-gray-100" />
        </button>

        <!-- Divider (Desktop) -->
        <div
          class="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden md:block"
        ></div>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full"
          :title="isDark ? t('Switch to light mode') : t('Switch to dark mode')"
          type="button"
          :aria-label="
            isDark ? t('Switch to light mode') : t('Switch to dark mode')
          "
        >
          <Icon
            v-if="isDark"
            name="lucide:sun"
            class="h-5 w-5 transition-transform hover:rotate-180 duration-500 dark:text-gray-100"
          />
          <Icon
            v-else
            name="lucide:moon"
            class="h-5 w-5 transition-transform hover:-rotate-12 duration-300 dark:text-gray-100"
          />
        </button>

        <!-- Language Toggle -->
        <button
          @click="toggleLocale"
          class="h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full"
          type="button"
          :aria-label="t('Switch language')"
          :title="t('Switch language')"
        >
          <span class="text-lg leading-none">{{
            locale === 'en' ? '🇬🇧' : '🇸🇦'
          }}</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRTL } from '../composables/useRTL';
import { useTheme } from '../composables/useTheme';
import { useTranslations } from '../composables/useTranslations';
import AppDrawer from './AppDrawer.vue';

const { dir, locale, toggleLocale } = useRTL();
const { theme, toggleTheme, isDark } = useTheme();
const { t } = useTranslations();

const drawerRef = ref<InstanceType<typeof AppDrawer> | null>(null);

const toggleMobileDrawer = () => {
  // Emit event to parent to toggle drawer
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('toggle-drawer');
    window.dispatchEvent(event);
  }
};
</script>
