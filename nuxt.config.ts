// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Glam Connect || Customer",
      titleTemplate: "%s",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.ico" },
        {
          rel: "alternate",
          hreflang: "en",
          href: "",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "",
        },
      ],
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/motion/nuxt",
    "nuxt-icon",
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  css: ["~/assets/fonts/fonts.css"],

  plugins: [{ src: "~/plugins/toast.ts", mode: "client" }],
});
