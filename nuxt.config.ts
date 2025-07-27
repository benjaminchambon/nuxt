import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    strict: true,
  },
  imports: {
    dirs: ['composables/**'],
  },
  components: [
    {
      path: '~/components/Dashboard',
      pathPrefix: false,
    },
    {
      path: '~/components/DesignSystem',
      pathPrefix: false,
    },
  ],
});
