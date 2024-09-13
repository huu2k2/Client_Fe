import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@customhooks": path.resolve(__dirname, "./src/customHooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    port: 9000,
  },
});
