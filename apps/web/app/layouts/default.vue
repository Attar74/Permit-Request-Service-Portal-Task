<template>
  <div :dir="dir" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppDrawer v-model="drawerOpen" />
    <div
      class="transition-all duration-300 ease-in-out"
      :class="drawerOpen ? 'ml-20 md:ml-64' : 'ml-20 md:ml-20'"
    >
      <AppHeader />
      <main class="container mx-auto px-4 py-6 sm:py-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import AppDrawer from '../../components/AppDrawer.vue';
import { useRTL } from '../../composables/useRTL';

const { dir } = useRTL();
const drawerOpen = ref(true);
</script>
