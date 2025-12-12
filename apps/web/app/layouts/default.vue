<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/apply">Apply</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #2563eb;
  font-weight: 500;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 2rem;
}
</style>

