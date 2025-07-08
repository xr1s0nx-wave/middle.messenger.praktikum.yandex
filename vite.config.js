import { defineConfig } from "vite";
export default defineConfig({
  root: "./",
  build: { outDir: "build" },
  resolve: { alias: { "@": "/src" } },
  server: {
    port: 3000,
    proxy: {
      '/ws': {
        target: 'wss://ya-praktikum.tech',
        ws: true,
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://ya-praktikum.tech',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: { port: 3000 },
});
