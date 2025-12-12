// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-12',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/icon'],
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
    // Public keys (exposed to client-side)
    public: {
      // Add public runtime config here if needed
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    exposeConfig: false,
  },
  imports: {
    dirs: ['composables'],
  },
  app: {
    head: {
      script: [
        {
          innerHTML: `(function(){try{const t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          type: 'text/javascript',
        },
      ],
    },
  },
});
