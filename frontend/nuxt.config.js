/* eslint-disable no-template-curly-in-string */
export default {
  server: {
    // port: 3000, // default: 3000
    // host: 0.0.0.0, // default: localhost
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Whitebird',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    script: [
      {
        src: 'https://kit.fontawesome.com/f04c8c4f04.js',
      },
    ],
  },

  generate: {
    exclude: [/^\/share/], // Path starts with Share
  },

  env: {
    FRONTEND_HOST: process.env.FRONTEND_HOST,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/scrollanimation.client.js',
    '~/plugins/socketStoreInjecter.js',
    '~/plugins/persistedState.client.js',
    '~/plugins/i18n.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-socket-io',
    'nuxt-fontawesome',
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    'vue-sweetalert2/nuxt',
  ],
  i18n: {
    locales: [
      { code: 'en', file: 'en.js' },
      { code: 'de', file: 'de.js' },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    langDir: 'locales/',
    lazy: true,
  },
  io: {
    sockets: [
      {
        name: 'whitebirdSocket',
        url: process.env.SOCKET_URL,
        default: true,
        // https://nuxt-socket-io.netlify.app/configuration#vuex-options-per-socket
        // https://medium.com/javascript-in-plain-english/introduction-to-nuxt-socket-io-b78c5322d389
        vuex: {
          mutations: [],
          actions: [
            { messageToClient: 'socket/messageToClient' },
            { createCanvasObjectServer: 'canvas/createCanvasObjectServer' },
            { deleteCanvasObjectServer: 'canvas/deleteCanvasObjectServer' },
            { updateCanvasObjectServer: 'canvas/updateCanvasObjectServer' },
          ],
          emitBacks: [],
        },
      },
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    retry: { retries: 3 },
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  /*
   ** Runtime Configs
   ** https://nuxtjs.org/guide/runtime-config
   **
   ** The '${SOMETHING_IN_MY_ENV_FILE}'-Notation only works for non-objets
   ** For Objects, like the Axios definition below,
   ** you have to directly access the value via 'process.env.SOMETHING_IN_MY_ENV_FILE'
   */
  publicRuntimeConfig: {
    axios: {
      retry: { retries: 3 },
    },
  },

  privateRuntimeConfig: {
    axios: {
      retry: { retries: 3 },
    },
  },
};
