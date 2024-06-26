// https://vitejs.dev/config/

/** @type {import('vite').UserConfig} */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@components": path.resolve(__dirname, "./src/components/"),
    },
  },
});
