// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    apiBaseUrl: 'http://156.236.31.140:8001'
  },

  fonts: {
    providers: {
      adobe: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      google: false,
      googleicons: false
    }
  },

  image: {
    domains: ['mbico.ir'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      '3xl': 1920
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
