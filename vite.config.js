import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
  },
});
