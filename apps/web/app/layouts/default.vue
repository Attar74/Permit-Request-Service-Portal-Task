<template>
  <div :dir="dir" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <main class="container mx-auto px-4 py-6 sm:py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../../components/AppHeader.vue';
import { useRTL } from '../../composables/useRTL';

const { dir } = useRTL();
</script>
