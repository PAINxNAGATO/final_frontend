import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'https://final-wheat-three.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});