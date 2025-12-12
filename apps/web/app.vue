<template>
  <div :dir="dir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { dir } = useRTL();
</script>
