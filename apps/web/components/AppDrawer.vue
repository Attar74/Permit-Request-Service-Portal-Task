<template>
  <div
    class="fixed top-20 z-40 h-[calc(100vh-5rem)] transition-all duration-300 ease-in-out"
    :class="[
      isOpen ? 'w-64' : 'w-20',
      isRTL ? 'right-0' : 'left-0',
      'md:translate-x-0',
      isOpen
        ? 'translate-x-0'
        : isRTL
          ? 'translate-x-full md:translate-x-0'
          : '-translate-x-full md:translate-x-0',
    ]"
  >
    <!-- Drawer Content -->
    <div
      class="h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col"
      :class="[
        isRTL ? 'border-l' : 'border-r',
        'border-gray-200 dark:border-gray-700',
      ]"
    >
      <!-- Toggle Button (Absolute Position) -->
      <button
        @click="toggleDrawer"
        :class="[
          'absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md z-50',
          isRTL
            ? 'left-0 -translate-x-1/2'
            : 'right-0 translate-x-1/2',
        ]"
        type="button"
        :aria-label="isOpen ? t('Close drawer') : t('Open drawer')"
      >
        <Icon
          :name="
            isOpen
              ? isRTL
                ? 'lucide:chevron-right'
                : 'lucide:chevron-left'
              : isRTL
                ? 'lucide:chevron-left'
                : 'lucide:chevron-right'
          "
          class="h-5 w-5 text-gray-700 dark:text-gray-300"
        />
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
            isOpen ? 'px-4' : 'px-0',
            isRTL ? (isOpen ? 'justify-end' : 'justify-center') : (isOpen ? 'justify-start' : 'justify-center'),
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
            isOpen ? 'px-4' : 'px-0',
            isRTL ? (isOpen ? 'justify-end' : 'justify-center') : (isOpen ? 'justify-start' : 'justify-center'),
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
import { useTranslations } from '../composables/useTranslations';

const route = useRoute();
const { locale, isRTL } = useRTL();
const { t } = useTranslations();

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
