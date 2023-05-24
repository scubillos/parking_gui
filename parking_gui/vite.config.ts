import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    host: true,
    port: 3000,
  },
  css: {
    devSourcemap: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // added for AWS-SDK with vite
      "./runtimeConfig": "./runtimeConfig.browser"
    },
  },
});
