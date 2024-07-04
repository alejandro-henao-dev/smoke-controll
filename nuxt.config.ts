// https://nuxt.com/docs/api/configuration/nuxt-config

let development = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  modules: ["@nuxtjs/tailwindcss"],
  plugins: [
    '~/plugins/jsstore'
  ],
  app: {
    baseURL:development ? "/" :"/.output/public"
  }
})