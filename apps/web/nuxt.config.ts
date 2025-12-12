// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-12',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
    // Public keys (exposed to client-side)
    public: {
      // Add public runtime config here if needed
    },
  },
  css: ['~/assets/css/main.css'],
});
