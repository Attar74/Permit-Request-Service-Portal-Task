<template>
  <div>
    <div class="mb-8 border-b border-[#e0e0e0] pb-4">
      <h1 class="text-3xl font-bold tracking-tight">
        Permit Request Service Portal
      </h1>
      <p class="text-gray-600 mt-2">
        View all permit applications below
      </p>
    </div>

    <PermitApplicationsList
      :applications="data || []"
      :pending="pending"
      :error="error"
    />
  </div>
</template>

<script setup lang="ts">
import PermitApplicationsList from '../../components/PermitApplicationsList.vue';
import type { PermitApplication } from '../../types/permit';

const { data, pending, error } =
  await useFetch<PermitApplication[]>('/api/permits');

console.log('data', data.value);
</script>
