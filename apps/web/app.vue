<template>
  <div :dir="dir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';
import { computed } from 'vue';
import { useRTL } from './composables/useRTL';
import { useTheme } from './composables/useTheme';

const { dir } = useRTL();
const { theme, isDark } = useTheme();

// Apply theme class to HTML element
useHead({
  htmlAttrs: {
    class: computed(() => (isDark.value ? 'dark' : '')),
  },
});
</script>
