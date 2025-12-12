<template>
  <div :dir="dir" class="min-h-screen bg-background">
    <header class="border-b">
      <nav class="container mx-auto flex items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="text-xl font-bold text-foreground">
          Permit Request Portal
        </NuxtLink>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/apply"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Apply
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { dir } = useRTL();
</script>
