import { presetAttributify, presetUno, transformerDirectives } from 'unocss';

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
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@huntersofbook/naive-ui-nuxt',
    '@unocss/nuxt',
    ['@nuxtjs/eslint-module', { ignorePath: '.prettierignore' }],
    '@pinia/nuxt',
  ],

  ssr: false,

  unocss: {
    transformers: [transformerDirectives()],
    presets: [presetUno(), presetAttributify()],
  },

  typescript: {
    strict: true,
  },
});
