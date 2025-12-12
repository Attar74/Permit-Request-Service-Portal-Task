<template>
  <div :dir="dir" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <div class="flex">
      <AppDrawer v-model="drawerOpen" />
      <div
        class="flex-1 transition-all duration-300 ease-in-out min-h-[calc(100vh-5rem)]"
        :class="[
          drawerOpen
            ? isRTL
              ? 'md:mr-64'
              : 'md:ml-64'
            : isRTL
              ? 'md:mr-20'
              : 'md:ml-20',
        ]"
      >
        <main class="container mx-auto px-4 py-6 sm:py-8">
          <slot />
        </main>
      </div>
    </div>
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import AppDrawer from '../../components/AppDrawer.vue';
import AppHeader from '../../components/AppHeader.vue';
import ToastContainer from '../../components/ToastContainer.vue';
import { useRTL } from '../../composables/useRTL';

const { dir, isRTL } = useRTL();
const drawerOpen = ref(true); // Open by default

const drawerRef = ref<InstanceType<typeof AppDrawer> | null>(null);

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

// Listen for drawer toggle events from header
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('toggle-drawer', toggleDrawer);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('toggle-drawer', toggleDrawer);
  }
});
</script>
