// https://nuxt.com/docs/api/configuration/nuxt-config

let development = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  plugins: [
    '~/plugins/jsstore'
  ],
  app: {
    baseURL:development ? "/" :"https://alejandro-henao-dev.github.io/smoke-controll/"
  },
  pwa: {
    registerType:"autoUpdate",
    manifest: {
      name: "Smoke Control",
      short_name: "Smoke Control",
      description: "Control your smoking habits",
      icons: [
        {
          src: "/icons/icon_64x64.svg",
          sizes: "64x64",
          type:"image/svg+xml"
        },
        {
          src: "/icons/icon_144x144.svg",
          sizes: "144x144",
          type:"image/svg+xml"
        },
        {
          src: "/icons/icon_192x192.svg",
          sizes: "192x192",
          type:"image/svg+xml"
        },
        {
          src: "/icons/icon_512x512.svg",
          sizes: "512x512",
          type:"image/svg+xml"
        }
      ]
    },
    workbox: {
      navigateFallback: "/",
      clientsClaim: true,
      skipWaiting: true
    },
    devOptions: {
      enabled:true
    }
  }
})