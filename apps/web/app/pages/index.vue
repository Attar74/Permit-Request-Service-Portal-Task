<template>
  <div>
    <div class="mb-8 border-b border-[#e0e0e0] pb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      >
        {{ t('Permit Request Service Portal') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ t('View all permit applications below') }}
      </p>
    </div>

    <PermitApplicationsList
      :applications="applications"
      :pending="pending"
      :error="error"
      :pagination="pagination"
      @update:currentPage="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import PermitApplicationsList from '../../components/PermitApplicationsList.vue';
import { useTranslations } from '../../composables/useTranslations';
import type {
  PermitApplication,
  PaginatedResponse,
} from '../../types/permit';

const { t } = useTranslations();

const currentPage = ref(1);
const size = 6;

// Fetch paginated data
const { data, pending, error, refresh } = await useFetch<
  PaginatedResponse<PermitApplication>
>('/api/permits', {
  query: computed(() => ({
    pageNumber: currentPage.value,
    size: size,
  })),
});

// Extract applications and pagination info
const applications = computed(() => {
  if (!data.value) return [];
  if (Array.isArray(data.value)) {
    // Fallback for non-paginated response
    return data.value;
  }
  return data.value.data || [];
});

const pagination = computed(() => {
  if (!data.value || Array.isArray(data.value)) {
    return null;
  }
  return {
    currentPage: data.value.pageNumber,
    totalPages: data.value.totalPages,
    total: data.value.total,
    size: data.value.size,
  };
});

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await refresh();
  // Scroll to top on page change
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
</script>
