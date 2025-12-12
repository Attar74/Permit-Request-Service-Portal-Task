<template>
  <div
    class="fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out"
    :class="[
      isOpen ? 'w-64' : 'w-20',
      'md:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]"
  >
    <!-- Drawer Content -->
    <div
      class="h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg flex flex-col"
    >
      <!-- Header with Toggle Button -->
      <div
        class="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-700"
      >
        <div v-if="isOpen" class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400"
          >
            <Icon name="lucide:file-check-2" class="h-6 w-6" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-gray-900 dark:text-gray-100">
              Portal
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              خدمة التصاريح
            </span>
          </div>
        </div>
        <button
          v-if="isOpen"
          @click="toggleDrawer"
          class="ml-auto h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm"
          type="button"
          :aria-label="'Close drawer'"
        >
          <Icon
            name="lucide:chevron-left"
            class="h-5 w-5 text-gray-700 dark:text-gray-300"
          />
        </button>
        <button
          v-else
          @click="toggleDrawer"
          class="h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm"
          type="button"
          :aria-label="'Open drawer'"
        >
          <Icon
            name="lucide:menu"
            class="h-5 w-5 text-gray-700 dark:text-gray-300"
          />
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <button
          @click="handleNavigation('/')"
          type="button"
          :class="[
            'w-full h-12 rounded-lg flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            route.path === '/'
              ? 'bg-black dark:bg-white text-white dark:text-black font-semibold shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            isOpen ? 'px-4 justify-start' : 'px-0 justify-center',
          ]"
        >
          <Icon
            name="lucide:home"
            class="h-5 w-5 flex-shrink-0"
            :class="
              route.path === '/'
                ? 'text-white dark:text-black'
                : 'text-gray-700 dark:text-gray-300'
            "
          />
          <span
            v-if="isOpen"
            class="text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            {{ t('Home') }}
          </span>
        </button>

        <button
          @click="handleNavigation('/apply')"
          type="button"
          :class="[
            'w-full h-12 rounded-lg flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            route.path === '/apply'
              ? 'bg-black dark:bg-white text-white dark:text-black font-semibold shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            isOpen ? 'px-4 justify-start' : 'px-0 justify-center',
          ]"
        >
          <Icon
            name="lucide:file-plus"
            class="h-5 w-5 flex-shrink-0"
            :class="
              route.path === '/apply'
                ? 'text-white dark:text-black'
                : 'text-gray-700 dark:text-gray-300'
            "
          />
          <span
            v-if="isOpen"
            class="text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            {{ t('Apply') }}
          </span>
        </button>
      </nav>
    </div>
  </div>

  <!-- Overlay (Mobile) -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-30 md:hidden"
      @click="closeDrawer"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRTL } from '../composables/useRTL';

const route = useRoute();
const { locale } = useRTL();

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
  }>(),
  {
    modelValue: true,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const isOpen = ref<boolean>(
  props.modelValue ?? (typeof window !== 'undefined' && window.innerWidth >= 768)
);

// Sync with v-model
watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
  }
);

watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue);
});

const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
};

const closeDrawer = () => {
  isOpen.value = false;
};

const handleNavigation = (path: string) => {
  navigateTo(path);
  // Close drawer on mobile after navigation
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    closeDrawer();
  }
};

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

// Close drawer on mobile when route changes
watch(route, () => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    closeDrawer();
  }
});

// Expose toggle function for parent components
defineExpose({
  toggleDrawer,
  isOpen,
});
</script>

