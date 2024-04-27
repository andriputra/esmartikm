require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'esmartikm',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Roboto:wght@400;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.ts',
    '~/plugins/toast.ts',
    '~/plugins/pikaday.client',
    '~/plugins/vue-v-viewer',
    {
      src: '~/plugins/lightbox',
      ssr: false,
    },
    {
      src: '~/plugins/youtube-embed',
      ssr: false,
    },
    {
      src: '~/plugins/vue-infinite-scroll',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],

  // tailwindcss module configuration (https://tailwindcss.com/docs)
  tailwindcss: {
    jit: true,
    configPath: '@/tailwind.config.js',
    cssPath: '@/assets/css/tailwind.css',
    exposeConfig: false,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://i18n.nuxtjs.org
    'nuxt-i18n',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // https://github.com/rigor789/vue-scrollto
    'vue-scrollto/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  // Auth module configuration (https://auth.nuxtjs.org/)
  auth: {
    strategies: {
      laravelPassport: {
        provider: 'laravel/passport',
        grantType: 'password',
        endpoints: {
          token: '/oauth/token',
          user: {
            url: '/api/profile',
          },
        },
        url: process.env.API_URL,
        clientId: Number(process.env.PASSPORT_CLIENT_ID),
        clientSecret: process.env.PASSPORT_CLIENT_SECRET,
        scope: '*',
      },
    },
  },

  // i18n module configuration (https://i18n.nuxtjs.org)
  i18n: {
    locales: [
      {
        code: 'id',
        file: 'id-ID.js',
      },
      {
        code: 'en',
        file: 'en-US.js',
      },
    ],
    lazy: true,
    langDir: 'assets/lang/',
    defaultLocale: 'id',
    vueI18n: {
      silentTranslationWarn: true,
      silentFallbackWarn: true,
    },
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },

  // svg-sprite module configuration (https://github.com/nuxt-community/svg-sprite-module)
  svgSprite: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: {
    color: 'rgb(24, 168, 255)',
  },
}
