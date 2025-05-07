// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  extends: [
    './layers/ui',
    './layers/api'
  ],

  runtimeConfig: {
    geminiAPI: ''
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    "@nuxt/ui-pro"
  ],

  css: ['~/assets/css/main.css']
})
