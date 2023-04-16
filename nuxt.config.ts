// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-icon"],
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    cookieName: "session_3",
    cookieSecret: "secret",
    cookieExpires: 60 * 60 * 24 * 7,
  },
});
