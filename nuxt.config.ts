// https://nuxt.com/docs/api/configuration/nuxt-config

let development = process.env.NODE_ENV !== 'production' || process.env.TEST_BUILD == "true"
var pjson = require('./package.json');
const baseURL = development ? "/" : "/asmoke-controll/"

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  plugins: [
    '~/plugins/jsstore'
  ],
  app: {
    baseURL:baseURL
  },
  runtimeConfig: {
    public: {
      version:pjson.version,
      baseURL:baseURL
    }
  },
  pwa: {
    registerType:"autoUpdate",
    manifest: {
      name: "Smoke Control",
      short_name: "Smoke Control",
      description: "Control your smoking habits",
      display: 'standalone',
      theme_color: '#000000',
      background_color: '#ffffff',
      icons: [
        {
          src: `${baseURL}icons/icon_64x64.svg`,
          sizes: "64x64",
          type: "image/svg+xml",
          purpose:"any"
        },
        {
          src: `${baseURL}icons/icon_144x144.svg`,
          sizes: "144x144",
          type: "image/svg+xml",
          purpose:"any"
        },
        {
          src: `${baseURL}icons/icon_192x192.svg`,
          sizes: "192x192",
          type: "image/svg+xml",
          purpose:"any"
        },
        {
          src: `${baseURL}icons/icon_512x512.svg`,
          sizes: "512x512",
          type: "image/svg+xml",
          purpose:"any"
        }
      ],
      screenshots: [    
        {
          "src": `${baseURL}screenshots/screenshot_385x430.png`,
          "sizes": "385x530",
          "type": "image/png",
          "form_factor": "narrow",
          "label": "Application"
        },
        {
          "src": `${baseURL}screenshots/screenshot_573x352.png`,
          "sizes": "573x352",
          "type": "image/png",
          "form_factor": "wide",
          "label": "Application"
        }
      ]
    },
    
    workbox: {
      navigateFallback: baseURL,
      clientsClaim: true,
      skipWaiting: true
    },
    devOptions: {
      enabled:true
    }
  }
})