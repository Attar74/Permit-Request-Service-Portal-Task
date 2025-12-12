<template>
  <div
    class="fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] transition-all duration-300 ease-in-out"
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
      <!-- Toggle Button (Absolute Position) -->
      <button
        @click="toggleDrawer"
        :class="[
          'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 px-4 rounded-[1rem] border border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md hover:shadow-xl active:scale-95 z-50',
          isOpen
            ? 'bg-black dark:bg-white text-white dark:text-black font-semibold'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300',
        ]"
        type="button"
        :aria-label="isOpen ? 'Close drawer' : 'Open drawer'"
      >
        <Icon
          :name="isOpen ? 'lucide:chevron-left' : 'lucide:chevron-right'"
          class="h-4 w-4"
        />
        <span v-if="isOpen" class="text-sm font-medium">Close</span>
      </button>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <button
          @click="handleNavigation('/')"
          type="button"
          :class="[
            'w-full h-12 flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-[1rem]',
            route.path === '/'
              ? 'bg-black dark:bg-black/20 text-white dark:text-white font-semibold shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black/20',
            isOpen ? 'px-4 justify-start' : 'px-0 justify-center',
          ]"
        >
          <Icon
            name="lucide:home"
            class="h-5 w-5 flex-shrink-0"
            :class="
              route.path === '/'
                ? 'text-white dark:text-white'
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
            'w-full h-12 flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-[1rem]',
            route.path === '/apply'
              ? 'bg-black dark:bg-black/20 text-white dark:text-white font-semibold shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-black/20',
            isOpen ? 'px-4 justify-start' : 'px-0 justify-center',
          ]"
        >
          <Icon
            name="lucide:file-plus"
            class="h-5 w-5 flex-shrink-0"
            :class="
              route.path === '/apply'
                ? 'text-white dark:text-white'
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
      class="fixed inset-0 bg-black/50 z-30 md:hidden top-20"
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
  props.modelValue ??
    (typeof window !== 'undefined' && window.innerWidth >= 768)
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
