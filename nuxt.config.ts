import { presetUno, presetAttributify, presetIcons } from 'unocss';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind.css'],

  i18n: {
    defaultLocale: 'en',
    langDir: 'lang',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
    ],
  },

  modules: [
    '@nuxtjs/i18n',
    '@huntersofbook/naive-ui-nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    ['@nuxtjs/eslint-module', { ignorePath: '.prettierignore' }],
  ],

  piniaPersistedstate: {
    debug: true,
    storage: 'localStorage',
  },

  ssr: false,

  unocss: {
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        collections: {
          custom: FileSystemIconLoader('./assets/icons'),
        },
      }),
    ],
  },

  router: {
    base: '/pandorai/',
  },

  target: 'static',

  typescript: {
    strict: true,
  },
});
