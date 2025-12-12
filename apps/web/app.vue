<template>
  <div :dir="dir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useRTL } from './composables/useRTL';
import { useTheme } from './composables/useTheme';

const { dir } = useRTL();
const { theme } = useTheme();
</script>
