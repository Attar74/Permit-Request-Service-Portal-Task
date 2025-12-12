<template>
  <div
    v-if="totalPages > 1"
    class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
  >
    <!-- Page Info -->
    <div class="text-sm text-gray-600 dark:text-gray-400">
      {{ t('Showing') }}
      <span class="font-semibold text-gray-900 dark:text-gray-100">{{
        startItem
      }}</span>
      {{ t('to') }}
      <span class="font-semibold text-gray-900 dark:text-gray-100">{{
        endItem
      }}</span>
      {{ t('of') }}
      <span class="font-semibold text-gray-900 dark:text-gray-100">{{
        total
      }}</span>
      {{ t('results') }}
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center gap-2">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'h-10 px-4 rounded-[0.875rem] flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          currentPage === 1
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md active:scale-95',
        ]"
        type="button"
        :aria-label="t('Previous page')"
      >
        <Icon
          :name="isRTL ? 'lucide:chevron-right' : 'lucide:chevron-left'"
          class="h-4 w-4"
        />
        <span class="hidden sm:inline text-sm font-medium">{{
          t('Previous')
        }}</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'h-10 w-10 rounded-[0.875rem] flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-sm font-medium',
            page === currentPage
              ? 'bg-black dark:bg-gray-800 text-white dark:text-white shadow-md'
              : 'bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md active:scale-95',
          ]"
          type="button"
          :aria-label="t('Go to page') + ' ' + page"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[
          'h-10 px-4 rounded-[0.875rem] flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          currentPage === totalPages
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md active:scale-95',
        ]"
        type="button"
        :aria-label="t('Next page')"
      >
        <span class="hidden sm:inline text-sm font-medium">{{
          t('Next')
        }}</span>
        <Icon
          :name="isRTL ? 'lucide:chevron-left' : 'lucide:chevron-right'"
          class="h-4 w-4"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRTL } from '../composables/useRTL';
import { useTranslations } from '../composables/useTranslations';

interface Props {
  currentPage: number;
  totalPages: number;
  total: number;
  size: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

const { isRTL } = useRTL();
const { t } = useTranslations();

const startItem = computed(() => {
  return (props.currentPage - 1) * props.size + 1;
});

const endItem = computed(() => {
  const end = props.currentPage * props.size;
  return end > props.total ? props.total : end;
});

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(props.totalPages, start + maxVisible - 1);

  // Adjust start if we're near the end
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page);
  }
};
</script>
