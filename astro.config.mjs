// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ghorebose.com",
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/dashboard") &&
        !page.includes("/admin") &&
        !page.includes("/checkout") &&
        !page.includes("/order-success") &&
        !page.includes("/login") &&
        !page.includes("/signup") &&
        !page.includes("/forgot-password") &&
        !page.includes("/reset-password"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
